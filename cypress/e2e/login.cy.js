import LoginPage from '../../pages/loginPage';

describe('Login Automation Tests - OrangeHRM', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  it('Should log in successfully with valid credentials', () => {
    loginPage.enterUsername('Admin');
    loginPage.enterPassword('admin123');
    loginPage.clickLoginButton();
    cy.url().should('include', '/dashboard');
  });

  it('Should display an error for invalid credentials', () => {
    loginPage.enterUsername('InvalidUser');
    loginPage.enterPassword('invalid123');
    loginPage.clickLoginButton();
    loginPage.validateErrorMessage('Invalid credentials', true);
  });

  it('Should display an error for empty username and password', () => {
    loginPage.enterUsername('');
    loginPage.enterPassword('');
    loginPage.clickLoginButton();
    loginPage.validateErrorMessage('Required');
  });

  it('Should log in successfully with lower case username', () => {
    loginPage.enterUsername('admin');
    loginPage.enterPassword('admin123');
    loginPage.clickLoginButton();
    cy.url().should('include', '/dashboard');
  });

  it('Should display an error for special characters in username', () => {
    loginPage.enterUsername('@dm!n');
    loginPage.enterPassword('admin123');
    loginPage.clickLoginButton();
    loginPage.validateErrorMessage('Invalid credentials', true);
  });
});