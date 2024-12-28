import LoginPageActions from "../../support/page-objects/login-page/login-page-actions";
import LoginPageAssertions from "../../support/page-objects/login-page/login-page-assertions";

const loginPageActions = new LoginPageActions();
const loginPageAssertions = new LoginPageAssertions();

describe("Login Automation Tests - OrangeHRM", () => {
  beforeEach(() => {
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.fixture('login-page/loginInfo.json').as('logInfo');
  });

  it('TC_Login_001: Login with valid credentials', function () {
    cy.get('@logInfo').then((infoData) => {
      loginPageActions.enterUsername(infoData.username.valid);
      loginPageActions.enterPassword(infoData.password.valid);
      loginPageActions.clickLoginButton();

      cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

      loginPageAssertions.checkValidLogin('/dashboard');
    });
  });

  it('TC_Login_002: Login with invalid credentials', function () {
    cy.get('@logInfo').then((infoData) => {
      loginPageActions.enterUsername(infoData.username.invalid);
      loginPageActions.enterPassword(infoData.password.invalid);
      loginPageActions.clickLoginButton();

      cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

      loginPageAssertions.checkInvalidLogin(infoData.errorMsg.invalidLogin);
    });
  });

  it('TC_Login_003: Login with empty fields', function () {
    cy.get('@logInfo').then((infoData) => {
      loginPageActions.enterUsername(infoData.username.empty);
      loginPageActions.enterPassword(infoData.password.empty);
      loginPageActions.clickLoginButton();

      loginPageAssertions.checkUsernameInputErrorMessageContainsValue(infoData.errorMsg.fieldRequired);
      loginPageAssertions.checkPasswordInputErrorMessageContainsValue(infoData.errorMsg.fieldRequired);
    });
  });

  it('TC_Login_004: Login with username in lowercase', function () {
    cy.get('@logInfo').then((infoData) => {
      loginPageActions.enterUsername(infoData.username.valid.toLowerCase());
      loginPageActions.enterPassword(infoData.password.valid);
      loginPageActions.clickLoginButton();

      cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

      loginPageAssertions.checkValidLogin('/dashboard');
    });
  });

  it('TC_Login_005: Login with special characters in username', function () {
    cy.get('@logInfo').then((infoData) => {
      loginPageActions.enterUsername('@dm!n');
      loginPageActions.enterPassword(infoData.password.valid);
      loginPageActions.clickLoginButton();

      cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

      loginPageAssertions.checkInvalidLogin(infoData.errorMsg.invalidLogin);
    });
  });
});