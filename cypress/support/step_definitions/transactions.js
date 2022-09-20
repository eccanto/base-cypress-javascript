import { Then, When } from "@badeball/cypress-cucumber-preprocessor";


When('apply the {string} currency filter', (currency) => {
    cy.get('.transactions-main__filters', { timeout: 30000 }).contains('Filters').click();
    cy.get('#filters_currencyFilter').parent().parent().click();

    cy.get('#transactions-filters').contains('li', currency).click();

    // Intercept transactions request.
    cy.intercept('/dataWidget/service/transactions*').as('getFilteredTransactions');

    cy.get('.transactions-main__filters-buttons').contains('Apply').click();

    // Wait for the first response to finish.
    cy.wait('@getFilteredTransactions');

    // TODO: Have to use wait, the table does not update soon enough, there is no loading indicator.
    // Alternative: check whether the table contents have changed (using innerHTML).
    cy.wait(2000);
});


Then('all transactions in the table use currency {string}', (currency) => {
    cy.get('.transactions-main__list').then(($table) => {
        if ($table.find('li').length > 0) {
            cy.wrap($table).find('li').each(($item) => {
                cy.wrap($item).within(() => {
                    cy.get('.transactions-main__item--amount').should(($amount) => {
                        expect($amount.text()).to.match(RegExp(` ${currency}\\s*$`, 'g'));
                    });
                });
            });
        }
    });
});
