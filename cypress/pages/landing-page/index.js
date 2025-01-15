const elements = require('./elements').elements;

class LandingPage {

    navigates() {
        cy.visit('https://www.leyaonline.com/pt/')
    }

    search(searchString) {
        cy
            .get(elements.searchBar)
            .type(`${searchString}{enter}`);
    }

    enableDarkMode() {
        cy
            .get(elements.darkModeButton)
            .click();
    }

    headerBackgroundColor() {
        return cy.get(elements.header);
    }
}

export default new LandingPage();