// Regular expression for validating email addresses, courtesy of http://emailregex.com/
const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    // Check for absence of comma separator between multiple email addresses (validity test comes next). Example: 'email1@example.com @example.com'.
    // Detect multiple email addresses by checking for two or more periods.
    const firstPeriod = emails.indexOf('.');
    const lastPeriod = emails.lastIndexOf('.');
    if (firstPeriod !== lastPeriod && firstPeriod !== -1 && !emails.includes(',')) {
        return `You need to insert a comma between email addresses to separate them.`;
    }

    // Check for trailing comma.
    if (emails.endsWith(',')) {
        return `Remove the comma at the end.`;
    }

    /**
     * Return an error message containing the contents of an array with invalid email addresses.
     * 1. Split incoming emails string into separate email addresses using comma separator.
     * 2. Iterate through each extracted email address and remove leading and trailing spaces.
     * 3. Apply regular expression to each email address. Filter out the bad ones from the good.
     *    Bad email addresses fail the reg ex test and return false. Let those be the final elements
     *    left in the array returned to invalidEmailsArray constant.
     */
    const invalidEmailsArray = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => emailRegEx.test(email) === false);
    
    if (invalidEmailsArray.length > 0) {
        if (invalidEmailsArray.length === 1) {
            return `The following email address is not valid: ${invalidEmailsArray[0]}`;
        }
        return `The following email addresses are not valid: ${invalidEmailsArray.join(', ')}`;
    }

    return;
};