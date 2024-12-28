import ForgotPasswordActions from "../../support/page-objects/forgot-password-page/forgot-password-page-actions";
import ForgotPasswordAssertions from "../../support/page-objects/forgot-password-page/forgot-password-page-assertions";

const forgotPasswordActions = new ForgotPasswordActions();
const forgotPasswordAssertions = new ForgotPasswordAssertions();

describe("Forgot Password Tests - OrangeHRM", () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.fixture('login-page/loginInfo.json').as('logInfo');
  });

  it('TC_ForgotPassword_001: Request reset password with valid username', function () {
    cy.get('@logInfo').then((infoData) => {
      cy.intercept('POST', '/web/index.php/auth/requestResetPassword').as('resetRequest');
  
      forgotPasswordActions.clickForgotPasswordLink();
      forgotPasswordActions.enterUsername(infoData.username.valid);
      forgotPasswordActions.clickResetPasswordButton();
  
      cy.wait('@resetRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(302);
      });
  
      cy.url().then((currentUrl) => {
        cy.log('Current URL:', currentUrl);
        expect(currentUrl).to.include('/web/index.php/auth/sendPasswordReset');
      });
  
      forgotPasswordAssertions.checkResetPasswordSuccessMessage('Reset Password link sent successfully');
    });
  });

  it('TC_ForgotPassword_002: Request reset password with invalid username', function () {
    cy.get('@logInfo').then((infoData) => {
      cy.intercept('POST', '/web/index.php/auth/requestResetPassword').as('resetRequest');
  
      forgotPasswordActions.clickForgotPasswordLink();
      forgotPasswordActions.enterUsername(infoData.username.invalid);
      forgotPasswordActions.clickResetPasswordButton();
  
      cy.wait('@resetRequest', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(302);
        cy.log('Response Body:', interception.response.body);
      });
  
      cy.get('.oxd-alert-content', { timeout: 10000 }).should('contain.text', 'Invalid username');
    });
  });

  it('TC_ForgotPassword_003: Request reset password with empty username', function () {
    cy.get('@logInfo').then((infoData) => {
      forgotPasswordActions.clickForgotPasswordLink();
      forgotPasswordActions.enterUsername('');
      forgotPasswordActions.clickResetPasswordButton();
  
      forgotPasswordAssertions.checkResetPasswordErrorMessage('Required');
    });
  });
});