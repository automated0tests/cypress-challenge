const elements = require('./elements').elements;

class Book {

    searchBookInList(title) {
        return cy.get(elements.bookTitle)
        .contains(title)
    }

    checkBookDescription(bookTitle, searchString) {
        cy.get(elements.bookTitle)
            .contains(bookTitle)
            .parent()
            .parent()
            .click();
        return cy.contains(searchString);
    }

    checkBookAuthor(bookTitle, searchString) {
        cy.get(elements.bookTitle)
            .contains(bookTitle)
            .parent()
            .parent()
            .click();
        return cy.contains(searchString);
    }

    checkOtherBooksByAuthor(bookTitle, searchString) {
        cy.get(elements.bookTitle)
            .contains(bookTitle)
            .parent()
            .parent()
            .click();
        
        return  cy.get(elements.booksByAuthor)
                .get(elements.bookTitle)
                .contains(searchString);
    }

    addBookToBasket(bookTitle) {
        return cy.get(elements.bookTitle +':contains("'+bookTitle+'")')
        .parent()
        .parent()
        .parent()
        .children(elements.buyButtonDiv)
        .children(elements.buyButton)
        .click();
    }

    verifyBasket() {
        return cy
            .get(elements.basket, { timeout: 10000 })
            .children(elements.itemsNumber, { timeout: 10000 })
    }

    emptyBasket() {
        cy.get(elements.basket)
        .children(elements.itemsNumber)
        .click()

        return cy.get(elements.emptyBasket)
        .click()
    }

    getMenu() {
       return cy.get(elements.atcDropdown, { timeout: 10000 })
    }

    checkBookData(dataType, searchString) {
        let prefix = '';
        switch (dataType) {
            case 'ISBN':
                prefix = 'ISBN: ';
            break;
            case 'pageNumber':
                prefix = 'Páginas: ';
            break;
            // dimensions
            default:
                prefix = 'Dimensões: ';
            break;
        }
        
        return cy.contains(prefix + searchString);
    }
}

export default new Book();