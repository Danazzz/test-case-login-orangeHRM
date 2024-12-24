/// <reference types="cypress" />

describe('Test Automation for OrangeHRM Login', () => {
  beforeEach(() => {
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC_Login_001: Login with valid credentials', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.url().should('include', '/dashboard');
  });

  it('TC_Login_002: Login with invalid credentials', () => {
    cy.get('input[name="username"]').type('InvalidUser');
    cy.get('input[name="password"]').type('invalid123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.url().should('include', '/auth/login');

    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
  });

  it('TC_Login_003: Login with empty fields', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('contain.text', 'Required');
  });

  it('TC_Login_004: Login with username in lowercase', () => {
    cy.get('input[name="username"]').type('admin'); 
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.url().should('include', '/dashboard');
  });

  it('TC_Login_005: Login with special characters in username', () => {
    cy.get('input[name="username"]').type('@dm!n');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.url().should('include', '/auth/login');

    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
  });
});