class ForgotPasswordAssertions {
    checkResetPasswordErrorMessage(expectedMessage) {
      cy.contains(expectedMessage, { timeout: 10000 })
        .should('be.visible')
        .then(($el) => {
          cy.log('Error message found: ' + $el.text());
        });
    }
  
    checkResetPasswordSuccessMessage(expectedMessage) {
      cy.contains(expectedMessage, { timeout: 10000 })
        .should('be.visible')
        .then(($el) => {
          cy.log('Success message found: ' + $el.text());
        });
    }
  }
  
  export default ForgotPasswordAssertions;