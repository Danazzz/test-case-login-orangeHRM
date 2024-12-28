import DashboardActions from '../../support/page-objects/dashboard-page/dashboard-page-actions';
import DashboardAssertions from '../../support/page-objects/dashboard-page/dashboard-page-assertions';

const dashboardActions = new DashboardActions();
const dashboardAssertions = new DashboardAssertions();

describe('Dashboard Tests - OrangeHRM', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.intercept('POST', '/web/index.php/auth/validate').as('postLogin');
    cy.intercept('GET', '/web/index.php/dashboard/*').as('getDashboardData');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@postLogin').its('response.statusCode').should('eq', 302);

    cy.wait('@getDashboardData').its('response.statusCode').should('eq', 200);

    cy.url().should('include', '/dashboard');
  });

  it('TC_Dashboard_001: Validate presence of main menu items', () => {
    dashboardAssertions.validateMenuExists('Admin');
    dashboardAssertions.validateMenuExists('PIM');
    dashboardAssertions.validateMenuExists('Leave');
    dashboardAssertions.validateMenuExists('Dashboard');
  });

  it('TC_Dashboard_002: Navigate to Admin menu', () => {
    dashboardActions.clickMenu('Admin');
    dashboardActions.validateDashboardHeader('Admin');
    cy.url().should('include', '/admin/viewSystemUsers');
  });

  it('TC_Dashboard_003: Navigate to PIM menu', () => {
    dashboardActions.clickMenu('PIM');
    dashboardActions.validateDashboardHeader('PIM');
    cy.url().should('include', '/pim/viewEmployeeList');
  });
});