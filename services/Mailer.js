// A lot of the functionality here is ugly and complex but it is what SendGrid requires.  Feel free to explore other third party options like MailChimp.
const sendGrid = require('sendgrid');
// We prefer the name helper below.  Line could have been: const { mail } = sendgrid;
const helper = sendGrid.mail;
const keys = require('../config/keys');

// We want to extend the functionality of the SendGrid Mail class.
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();    // Call Mail constructor.
        this.sgApi = sendGrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);     // Mail class we inherit has addContent() function expecting body of email.
        this.addClickTracking();        // Our own helper function defined below.
        this.addRecipients();           // Our own helper function defined below.
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        })
    }

    // This is how SendGrid replaces URL links in our email with its own redirect URLs.
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);   // Mail class we inherit has this function.
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;