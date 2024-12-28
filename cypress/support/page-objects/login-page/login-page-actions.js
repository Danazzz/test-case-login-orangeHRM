class LoginPageActions {
  enterUsername(username) {
    if (username) {
      cy.get('[name="username"]').type(username);
    }
  }

  enterPassword(password) {
    if (password) {
      cy.get('[name="password"]').type(password);
    }
  }

  clickLoginButton() {
    cy.get('[type="submit"]').click();
  }
}

export default LoginPageActions;