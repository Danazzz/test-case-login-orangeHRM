class LoginPageAssertions {
    checkValidLogin(expectedUrl) {
      cy.url().should('include', expectedUrl);
    }
  
    checkInvalidLogin(expectedMessage) {
      cy.get('.oxd-alert-content', { timeout: 10000 })
        .should('contain.text', expectedMessage)
        .then(($el) => {
          cy.log('Pesan error ditemukan: ' + $el.text());
        });
    }
  
    checkUsernameInputErrorMessageContainsValue(expectedMessage) {
      cy.get('.oxd-input-group__message')
        .should('contain.text', expectedMessage);
    }
  
    checkPasswordInputErrorMessageContainsValue(expectedMessage) {
      cy.get('.oxd-input-group__message')
        .should('contain.text', expectedMessage);
    }
  }
  
  export default LoginPageAssertions;