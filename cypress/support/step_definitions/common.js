import { Given } from '@badeball/cypress-cucumber-preprocessor';


Given('go to Demo Casino web page', function () {
    cy.visit('https://demo.casino/');
});


Given('close the welcome pop-up modal', function () {
    cy.get('#welcome_modal', { timeout: 10000 }).should('be.visible').find('button[class^="button"]').click();
});


Given('click on the login button', function () {
    cy.get('.login').click();
    cy.get('[data-test="nav-login-head"]').click();
});


Given('enter the login account', function () {
    cy.get('[data-test="input-username"]').type(Cypress.env('USERNAME'));
    // Set log to "false" to keep the password secret.
    cy.get('[data-test="input-password"]').type(Cypress.env('PASSWORD'), {log: false});
    cy.get('[data-test="control-submit"]').click();
});
