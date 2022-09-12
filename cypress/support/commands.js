const { MailSlurp } = require('mailslurp-client');
const { htmlToText } = require('html-to-text');

const apiKey = Cypress.env('API_KEY');
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add('createInbox', () => {
    return mailslurp.createInbox();
});

Cypress.Commands.add('waitForLatestEmail', async (inboxId) => {
    const email = await mailslurp.waitController.waitForMatchingFirstEmail({
        inboxId,
        unreadOnly: true,
        timeout: 30000,
        matchOptions: {
            matches: [
                {
                    field: 'SUBJECT',
                    should: 'EQUAL',
                    value: 'Registration',
                },
            ],
        },
    });

    return htmlToText(email.body);
});
