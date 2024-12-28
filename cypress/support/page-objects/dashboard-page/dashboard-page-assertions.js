class DashboardAssertions {
    validateMenuExists(menuName) {
      cy.get('.oxd-main-menu').contains(menuName).should('exist');
    }
  
    validateWidgetExists(widgetName) {
      cy.get('.orangehrm-dashboard-widget').contains(widgetName).should('exist');
    }
  }
  
  export default DashboardAssertions;