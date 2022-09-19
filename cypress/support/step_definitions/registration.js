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


When('enter the registration data', function () {
    const inbox_id = this.mail_client.inbox.id.replaceAll('-', '');

    const data = {
        emailAddress: this.mail_client.inbox.emailAddress,
        currency: 'EUR',
        password: 'Password1',
        question: 'The street your grew up on',
        answer: 'test',
        username: inbox_id,
        bonus: 'No bonus',
        address: 'address',
        country: 'Angola',
        city: 'city',
        postcode: 'postcode',
        name: 'name',
        surname: 'surname',
        middle_name: 'middle_name',
        sex: 'Male',
        nickname: inbox_id,
    };

    cy.get('[data-test="input-email"]').type(data.emailAddress);

    cy.get('[data-test="input-terms_and_conditions"]').parent().click();

    cy.get('[data-test="input-currency"]').parent().parent().click()
        .find('.selectric-scroll').contains(data.currency).click();

    cy.get('[data-test="input-password"').type(data.password);
    cy.get('[data-test="input-password_confirmation"').type(data.password);

    cy.get('[data-test="input-secret_question"]').parent().parent().click()
        .find('.selectric-scroll').contains(data.question).click();

    cy.get('[data-test="input-secret_answer"').type(data.answer);

    cy.get('[data-test="input-username"').type(data.username);

    cy.get('#bonus-list-container').contains(data.bonus).click();

    cy.get('[data-test="input-address"').type(data.address);

    cy.get('[data-test="input-country"]').parent().parent().click()
        .find('.selectric-scroll').contains(data.country).click();

    cy.get('[data-test="input-city"').type(data.city);

    cy.get('[data-test="input-postcode"').type(data.postcode);

    cy.get('[data-test="input-name"').type(data.name);

    cy.get('[data-test="input-surname"').type(data.surname);

    cy.get('[data-test="input-middle_name"').type(data.middle_name);

    cy.get('[data-test="input-sex"]').parent().parent().click()
        .find('.selectric-scroll').contains(data.sex).click();

    cy.get('[data-test="input-nickname"]').type(data.nickname);
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
