describe('Create new account', () => {
    let inboxTest;

    beforeEach(() => {
        cy.createInbox().then((inbox) => {
            inboxTest = inbox;
        });

        cy.visit('https://demo.casino/');
    });

    it('should be able to create new account', () => {
        // Close welcome popup.
        cy.get('#welcome_modal', { timeout: 10000 }).should('be.visible').find('button[class^="button"]').click();

        // Go to registration window.
        cy.get('[data-test="nav-reg-head"]', { timeout: 10000 }).should('be.visible').click();

        // Enter registration data.
        cy.get('[data-test="input-email"]').type(inboxTest.emailAddress);

        cy.get('[data-test="input-terms_and_conditions"]').parent().click();

        cy.get('[data-test="input-currency"]').parent().parent().click()
            .find('.selectric-scroll').contains('EUR').click();

        cy.get('[data-test="input-password"').type('Password1');
        cy.get('[data-test="input-password_confirmation"').type('Password1');

        cy.get('[data-test="input-secret_question"]').parent().parent().click()
            .find('.selectric-scroll').contains('The street your grew up on').click();

        cy.get('[data-test="input-secret_answer"').type('test');

        cy.get('[data-test="input-username"').type(inboxTest.id.replaceAll('-', ''));

        cy.get('#bonus-list-container').contains('No bonus').click();

        cy.get('[data-test="input-address"').type('address');

        cy.get('[data-test="input-country"]').parent().parent().click()
            .find('.selectric-scroll').contains('Angola').click();

        cy.get('[data-test="input-city"').type('city');

        cy.get('[data-test="input-postcode"').type('postcode');

        cy.get('[data-test="input-name"').type('name');

        cy.get('[data-test="input-surname"').type('surname');

        cy.get('[data-test="input-middle_name"').type('middle_name');

        cy.get('[data-test="input-sex"]').parent().parent().click()
            .find('.selectric-scroll').contains('Male').click();

        cy.get('[data-test="input-nickname"]').type(inboxTest.id.replaceAll('-', ''));

        // Submit registration data.
        cy.get('[data-test="control-submit"]').click();

        // Wait and get verification code.
        cy.waitForLatestEmail(inboxTest.id).then((email) => {
            const regex = /moment!\s+(\w+)\s+CONFIRM/i;
            const verificationCode = email.match(regex)[1];

            cy.get('[data-test="input-code"]').type(verificationCode);
        });

        // Confirm verification code.
        cy.get('[data-test="control-submit"]').click();

        cy.get('.notification').contains('Your email address has been successfully verified');
    });
});
