describe('Login Feature Testing - OrangeHRM', () => {
  const testCases = [
    {
      username: 'Admin',
      password: 'admin123',
      expectedResult: 'dashboard'
    },
    {
      username: 'InvalidUser',
      password: 'invalid123',
      expectedResult: 'Invalid credentials'
    },
    {
      username: 'admin',
      password: 'admin123',
      expectedResult: 'dashboard'
    },
    {
      username: '@dm!n',
      password: 'admin123',
      expectedResult: 'Invalid credentials'
    }
  ];

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  testCases.forEach((testCase, index) => {
    it(`Test Case ${index + 1}: Login with username "${testCase.username}" and password "${testCase.password}"`, () => {

      if (testCase.username) {
        cy.get('[name="username"]').clear().type(testCase.username);
      }
      if (testCase.password) {
        cy.get('[name="password"]').clear().type(testCase.password);
      }
      
      cy.get('button[type="submit"]').click();

      if (testCase.expectedResult === 'dashboard') {
        cy.url().should('include', '/dashboard');
      } else {
        cy.get('.oxd-alert-content').should('contain.text', testCase.expectedResult);
      }
    });
  });
});