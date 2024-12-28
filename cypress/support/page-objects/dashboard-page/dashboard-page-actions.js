class DashboardActions {
    clickMenu(menuName) {
      cy.get('.oxd-main-menu').contains(menuName).click();
    }
  
    validateDashboardHeader(headerText) {
      cy.get('.oxd-topbar-header-breadcrumb').should('contain.text', headerText);
    }
  }
  
  export default DashboardActions;