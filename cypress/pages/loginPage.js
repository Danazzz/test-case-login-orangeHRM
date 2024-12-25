class LoginPage {
    usernameInput = '[name="username"]';
    passwordInput = '[name="password"]';
    loginButton = '[type="submit"]';
    errorMessage = '.oxd-input-group__message';
    errorMessageInvalid = '.oxd-alert-content';
  
    enterUsername(username) {
      if (username !== '') {
        cy.get(this.usernameInput).type(username);
      }
    }
  
    enterPassword(password) {
      if (password !== '') {
        cy.get(this.passwordInput).type(password);
      }
    }
  
    clickLoginButton() {
      cy.get(this.loginButton).click();
    }
  
    validateErrorMessage(expectedMessage, isInvalidCredential = false) {
      const selector = isInvalidCredential ? this.errorMessageInvalid : this.errorMessage;
      cy.get(selector, { timeout: 10000 })
        .should('contain.text', expectedMessage)
        .then(($el) => {
          cy.log('Pesan error ditemukan: ' + $el.text());
        });
    }
  }
  
  export default LoginPage;