import { Before, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { MailClient } from './src/mail_client/client';


Before(function () {
    cy.then(() => {
        this.mail_client = new MailClient();
        this.mail_client.createInbox();
    });
});


Given('click on the registration button', function () {
    cy.get('[data-test="nav-reg-head"]', { timeout: 10000 }).should('be.visible').click();
});


When('enter the registration data', function (table) {
    const table_map = table.hashes()[0];
    const inbox_id = this.mail_client.inbox.id.replaceAll('-', '');

    cy.get('[data-test="input-email"]').type(this.mail_client.inbox.emailAddress);

    cy.get('[data-test="input-terms_and_conditions"]').parent().click();

    cy.get('[data-test="input-currency"]').parent().parent().click()
        .find('.selectric-scroll').contains(table_map.currency).click();

    cy.get('[data-test="input-password"').type(table_map.password);
    cy.get('[data-test="input-password_confirmation"').type(table_map.password);

    cy.get('[data-test="input-secret_question"]').parent().parent().click()
        .find('.selectric-scroll').contains(table_map.question).click();

    cy.get('[data-test="input-secret_answer"').type(table_map.answer);

    cy.get('[data-test="input-username"').type(inbox_id);

    cy.get('#bonus-list-container').contains(table_map.bonus).click();

    cy.get('[data-test="input-address"').type(table_map.address);

    cy.get('[data-test="input-country"]').parent().parent().click()
        .find('.selectric-scroll').contains(table_map.country).click();

    cy.get('[data-test="input-city"').type(table_map.city);

    cy.get('[data-test="input-postcode"').type(table_map.postcode);

    cy.get('[data-test="input-name"').type(table_map.name);

    cy.get('[data-test="input-surname"').type(table_map.surname);

    cy.get('[data-test="input-middle_name"').type(table_map.middle_name);

    cy.get('[data-test="input-sex"]').parent().parent().click()
        .find('.selectric-scroll').contains(table_map.sex).click();

    cy.get('[data-test="input-nickname"]').type(inbox_id);
});


When('click on the submit registration button', function () {
    cy.get('[data-test="control-submit"]').click();
});


When('wait and enter the verification code', function () {
    cy.get('[data-test="input-code"]').then(async ($input) => {
        const verificationCode = await this.mail_client.waitVerificationCode(this.mail_client.inbox.id);

        cy.wrap($input).type(verificationCode);
        cy.get('[data-test="control-submit"]').click();
    });
});


Then('the notification {string} is shown', function (message) {
    cy.get('.notification').contains(message);
});
