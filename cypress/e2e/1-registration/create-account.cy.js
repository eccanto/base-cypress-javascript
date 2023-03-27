describe('Create new account', () => {
  let inboxTest

  beforeEach(() => {
    cy.createInbox().then((inbox) => {
      inboxTest = inbox
    })

    cy.visit('https://demo.casino/')
  })

  it('should be able to create new account', () => {
    // Close welcome popup.
    cy.get('#welcome_modal', { timeout: 10000 }).should('be.visible').find('button[class^="button"]').click()

    // Go to registration window.
    cy.get('[data-test="nav-reg-head"]', { timeout: 10000 }).should('be.visible').click()

    // Enter registration data.
    cy.get('[data-test="input-email"]').type(inboxTest.emailAddress)

    cy.get('[data-test="input-terms_and_conditions"]').parent().click()

    cy.get('[data-test="input-currency"]').parent().parent().click()
      .find('.selectric-scroll').contains('USD').click()

    cy.get('[data-test="input-password"').type('Password1')
    cy.get('[data-test="input-password_confirmation"').type('Password1')

    cy.get('#bonus-list-container').contains('No bonus').click()

    // Submit registration data.
    cy.get('[data-test="control-submit"]').click()

    // Wait and get verification code.
    cy.waitForLatestEmail(inboxTest.id).then((email) => {
      const regex = /moment!\s+(\w+)\s+CONFIRM/i
      const verificationCode = email.match(regex)[1]

      expect(verificationCode).to.not.be.empty
    })

    cy.get('.notification').debug().contains('Registration successfully finished!')
  })
})
