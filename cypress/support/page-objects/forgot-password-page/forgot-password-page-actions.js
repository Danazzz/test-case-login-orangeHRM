class ForgotPasswordActions {
    clickForgotPasswordLink() {
      cy.get('.oxd-text').contains('Forgot your password?').click();
    }
  
    enterUsername(username) {
      if (username) {
        cy.get('input[name="username"]').type(username);
      } else {
        cy.get('input[name="username"]').clear();
      }
    }
  
    clickResetPasswordButton() {
      cy.get('button[type="submit"]').click();
    }
  }
  
  export default ForgotPasswordActions;