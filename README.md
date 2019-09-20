# MERN-stack-demo
Demo app built on full stack React (MERN) featuring Google OAuth for login, Stripe for credit card payments, SendGrid for mass e-mailing of surveys to multiple recipients, Express for routing API requests from front-end to back-end, MongoDB for data persistence, and Redux for state management.

The app is built around the idea that I am providing a B2B service for businesses that want to send a survey to their customers.  The Stripe billing is where I charge the business for this service.  If they have purchased some credits in bulks of 5 credits for $5, then I allow the business to present a one question survey per credit to a list of users via email. 

Stripe is configured in test mode so no real credit card information is necessary or even supported. Just supply the dummy account specified below.

This app is hosted on Heroku:
https://afternoon-scrubland-21801.herokuapp.com

Right-click on above URL to launch app in a separate browser tab and refer to the instructions below.

## How to Use the App

### Log in with Google
Click on the link in the header to log in with Google. You will see the following message:

"To continue, Google will share your name, email address, language preference, and profile picture with afternoon-scrubland-21801.herokuapp.com."

Rest assured that in my app, I am NOT accessing, storing, or even looking at your name, email address, language preference, and profile picture. The only piece of data I use is a unique token (a long garbled string of letters and numbers) that Google passes back to identify you which I store in a cookie in your web browser so that I can distinguish you from other users when later retrieving records stored on your behalf in the back-end MongoDB database.

Enter a real Gmail email adddress (or a business email address that uses Gmail), click Next, then enter your password, and click Next. If you have successfully logged in, you will notice that the right side of the header of the web app has changed to specify Logout.

### Add Credits
In this app, you pay for the service by purchasing 5 credits for $5 and then you can administer 5 surveys.

As this is a demo app, real credit card numbers are not required, nor supported. Instead, any time you wish to purchase credits, click on the "Add Credits" button in the web app header and in the ensuing modal dialog supplied by Stripe, enter:

* Email: Any bogus email address (does not have to be real, just needs to look real, i.e., bogus@fake.com)
* Credit card number: 4242 4242 4242 4242
* Expiration date: enter any future date
* CVV security code: enter any three digits

Then click on the blue "Pay $5.00" button. Momentarily, the blue pay button will change to a green button with a checkmark and then the modal dialog will slide up and disappear.

### Create a Survey
Click on the round red + icon floating in the bottom right corner of the web browser window.

Fill out the form:

* Survey Title: Enter whatever you like.
* Subject: Enter what will be seen as the subject of the emails that get sent, probably the same as Survey Title.
* Email Body: Enter a question here. This is is your survey question. Example: "Do you like our service?"
* Recipient List: This is where you list one or more real email addresses, separated by commas. Play it safe and just enter one or more of your own email addresses (unless you forewarn a friend, co-worker, or family member) because a real email will be generated and sent out. 

When you are finished, click the green Next button. You will get a chance to review the information before it goes out. If
you decide to make additional edits, click the Back button. 

When you are ready, click on the "Send Survey" button.

You will be taken to a dashboard screen that shows all the surveys you have conducted, which is just one at this point.

## Respond to Survey
Check your email - whichever account(s) you entered in the survey recipient list. You should see a new email in your inbox for the survey you just sent. It will contain the survey question along with Yes/No links. Answer the survey by clicking on either Yes or No. 

Your web browser will be launched and opened to the app. Your vote will be counted and you will see a message "Thanks for voting!"

FYI, the app contains additional logic to ensure that it only counts one vote per email.

## View Survey Results
Unfortunately, this part of the app is not working. What is supposed to happen is if you refresh the app in your browser, the dashboard that contains information about each of your surveys is supposed to update the Yes and No counts. The problem lies with the SendGrid tool not communicating with the back-end MongoDB database. I am debugging the issue.

## Log Out
Click on the Logout link in the web app to sign out.
