describe('Apply filters to transactions', () => {
  beforeEach(() => {
    cy.visit('https://demo.casino/')

    // Close welcome popup.
    cy.get('#welcome_modal', { timeout: 10000 }).should('be.visible').find('button[class^="button"]').click()

    cy.get('.login').click()
    cy.get('[data-test="nav-login-head"]').click()

    cy.get('[data-test="input-username"]').type(Cypress.env('USERNAME'))
    // Set log to "false" to keep the password secret.
    cy.get('[data-test="input-password"]').type(Cypress.env('PASSWORD'), {log: false})
    cy.get('[data-test="control-submit"]').click()
  })

  it('Applies the currency filter', () => {
    cy.fixture('currencies').then((currencies) => {
      currencies.forEach((currency) => {
        cy.get('.transactions-main__filters', { timeout: 30000 }).contains('Filters').click()
        cy.get('#filters_currencyFilter').parent().parent().click()

        cy.get('#transactions-filters').contains('li', currency).click()

        // Intercept transactions request.
        cy.intercept('/dataWidget/service/transactions*').as('getFilteredTransactions')

        cy.get('.transactions-main__filters-buttons').contains('Apply').click()

        // Wait for the first response to finish.
        cy.wait('@getFilteredTransactions')

        // TODO: Have to use wait, the table does not update soon enough, there is no loading indicator.
        // Alternative: check whether the table contents have changed (using innerHTML).
        cy.wait(2000)  // eslint-disable-line

        // Verify that all the elements in the table use the currency ${currency}.
        cy.get('.transactions-main__list').then(($table) => {
          if ($table.find('li').length > 0) {
            cy.wrap($table).find('li').each(($item) => {
              cy.wrap($item).within(() => {
                cy.get('.transactions-main__item--amount').should(($amount) => {
                  expect($amount.text()).to.match(RegExp(` ${currency}\\s*$`, 'g'))
                })
              })
            })
          }
        })
      })
    })
  })
})
