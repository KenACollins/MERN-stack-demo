const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { Path } = require('path-parser');
const _ = require('lodash');
const { URL } = require('url'); // Comes with Node.js, not separately installed.

const Survey = mongoose.model('surveys');

module.exports = app => {
    /**
     * Issue a request to MongoDB to return all surveys that have been submitted by a certain user.
     * Recall that the user signed in is obtained from the req.user property. Since user must be
     * signed in, include requireLogin middleware step.
     * 
     * On second thought, we realize that some surveys could have 10,000 recipients. For our 
     * dashboard screen, we don't care about the recipients, so we revise our query to exclude
     * the recipients property by chaining select({ recipients: false }).
     */
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });
        res.send(surveys);
    });

    /**
     * Redirect user, who just clicked on Yes or No in an email survey, to a web page
     * that confirms the vote was received and thanks the user for participating.
     * 
     * Note that if we wanted to improve the app so that we could show users a more
     * specific message depending on the yes or no answer, we could instead modify the
     * surveySchema of server/models/Server.js to require that users creating surveys
     * provide us with a couple of extra parameters for absolute or relative URLs for
     * yes and no responses.
     */
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    /**
     * Web hook for SendGrid to communicate to our back-end the results of survey voting.
     */
    app.post('/api/surveys/webhooks', (req, res) => {
        console.log('Processing web hook...');
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)                   // We want to chain a set of lodash functions acting on req.body array.
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()                      // Remove undefined element from events array.
            .uniqBy('email', 'surveyId')    // Filter out duplicates. We only want one event per unique combination of email and survey ID.
            .each(({ surveyId, email, choice }) => {
                /** 
                 * MongoDB supports different functions. 
                 * o findOne() - Takes one parameter defining search criteria and returns one match.
                 * o updateOne() - Takes two parameters, first is search criteria, second is how to update returned record.
                 * o This update happens on MongoDB side, it is not passed back to our Express server where we have to search 
                 *   through results and make update to MongoDB ourselves.
                 */
                Survey.updateOne({
                    _id: surveyId,
                    recipients: { $elemMatch: { email: email, responded: false }}
                }, {
                    // Use MongoDB $inc operator to increment choice ('yes' or 'no') by 1.
                    // Note: [choice] is not an array, JS interpreter replaces it with 'yes' or 'no'.
                    $inc: { [choice]: 1 },

                    // Taking recipients from the survey found by 1st parameter, let $ represent the index
                    // position associated with $elemMatch, and then set its responded property to true.
                    $set: { 'recipients.$.responded': true }, 
                    lastResponded: new Date()
                }).exec();
            })
            .value();                       // Get final result of lodash chained methods.
        
        res.send({});                       // Send a response back to SendGrid, not that it is expecting one.
    });

    /**
     * In this case, any time a user makes a POST request to '/api/surveys' (1st 
     * parameter), we want to run two sets of middleware in succession (2nd and 3rd
     * parameters) before processing the route (4th parameter arrow function).
     * 
     * Our middleware functions first ensure the user is logged in, then ensure the
     * user has the funds in his account to pay for a new survey.
     */
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        // Through destructuring, retrieve fields for e-mail survey from incoming request. 
        // Note that recipients is a comma-space-delimited list of e-mail addresses.
        const { title, subject, body, recipients } = req.body;

        // Create survey instance, which at this point is just in memory.  

        // Thanks to ES6 compact syntax, we can simplify the code by not needing to specify
        // property: value when value matches property, eg., title: title.

        // Note that recipients property actually stores a subdocument collection based on
        // RecipientSchema schema which consists of two properties, email and responded.
        // Since responded is a Boolean property with a default value of false, we can skip
        // setting it below.  Instead, we just need to set recipients to an array of e-mail
        // address objects, { email: email.trim() }, accounting for possibility that after 
        // splitting on the comma separator, there might be a leading or trailing space.
        // We enclose in parentheses to avoid confusion in arrow function since return value
        // contains curly braces. 

        // We can also skip setting yes and no number properties since they default to 0
        // and since we don't have a date/time the user last responded, we skip setting
        // lastResponded.
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        try {
            // Great place to send an email!  Create an instance of Mailer and invoke its asynchronous send() method.
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();    // We coded this send() method inside Mailer.js.
    
            // If we have gotten this far, this means async mail send has completed.  Save our survey in MongoDB.
            await survey.save();
    
            // Deduct one credit from user's account for successful survey creation, submission, and save.
            req.user.credits -= 1;
    
            // Save updated user in MongoDB and likewise refresh our local copy of the user.
            // This will cause header in our React app to automatically update to reflect current credits count.
            const user = await req.user.save();
            res.send(user);
        }
        catch (err) {
            res.status(422).send(err);  // Use HTTP status code 422 for 'unprocessable entity' and just send back entire error message.
        }
    });
};