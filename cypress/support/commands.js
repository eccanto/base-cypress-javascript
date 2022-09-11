const { MailSlurp } = require('mailslurp-client');
// set your api key with an environment variable `CYPRESS_API_KEY` or configure using `env` property in config file
// (cypress prefixes environment variables with CYPRESS)
const apiKey = Cypress.env('API_KEY');

console.log('# apiKey:', apiKey);

const mailslurp = new MailSlurp({ apiKey });

const { htmlToText } = require('html-to-text');

Cypress.Commands.add("createInbox", () => {
    return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", async (inboxId) => {
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

    console.log('# first email:', email);

    return htmlToText(email.body);
});

Cypress.Commands.add('recursionLoop', {times: 'optional'}, function (fn, times) {
    if (typeof times === 'undefined') {
        times = 0;
    }

    cy.then(() => {
        const result = fn(++times);
        if (result !== false) {
            cy.recursionLoop(fn, times);
        }
    });
});
