import { MailSlurp } from 'mailslurp-client';
import { htmlToText } from 'html-to-text';


export class MailClient {
    constructor() {
        const apiKey = Cypress.env('API_KEY');

        this.mailslurp = new MailSlurp({ apiKey });

        this.inbox = null;
    }

    async createInbox() {
        this.inbox = await this.mailslurp.createInbox();
    }

    async waitVerificationCode(inboxId) {
        const email = await this.mailslurp.waitController.waitForMatchingFirstEmail({
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

        const email_content = htmlToText(email.body);
        const regex = /moment!\s+(\w+)\s+CONFIRM/i;
        return email_content.match(regex)[1];
    }
}
