import { Given } from '@badeball/cypress-cucumber-preprocessor';


Given('go to Demo Casino web page', function () {
    cy.visit('https://demo.casino/');
});


Given('close the welcome pop-up modal', function () {
    cy.get('#welcome_modal', { timeout: 10000 }).should('be.visible').find('button[class^="button"]').click();
});
