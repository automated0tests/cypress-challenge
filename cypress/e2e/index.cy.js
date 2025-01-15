/// <reference types="cypress"/>
import landingPage from '../pages/landing-page'
import books from '../pages/books'
import login from '../pages/login';

describe('Scenario 1', () => {
    before(() => {
        landingPage.navigates();
    })

    it('Should search for "George"', () => {
        landingPage.search('George');
    })

    it('Should verify that the book is present on list', () => {
        books.searchBookInList('O Triunfo dos Porcos')
        .then((result) => expect(result.html().trim()).equal('O Triunfo dos Porcos'));
    })

    it('Should have "Quinta Manor" in the book\'s description', () => {
        books.checkBookDescription('O Triunfo dos Porcos', 'Quinta Manor')
        .then((result) => {
            const hasString = result ? result.html().trim().includes('Quinta Manor') : false;
            expect(hasString).equal(true);
        });
    })
})

describe('Scenario 2', () => {
    before(() => {
        landingPage.navigates();
    })

    it('Should search for book "1984"', () => {
        landingPage.search('1984');
    })

    it('Should have "George Orwell" as author', () => {
        books.checkBookAuthor('1984', 'George Orwell')
        .then((result) => {
            const hasString = result ? result.html().trim().includes('George Orwell') : false;
            expect(hasString).equal(true);
        });
    })

    it('Should have ISBN "9789722071550"', () => {
        books.checkBookData('ISBN', '9789722071550')
        .then((result) => {
            const hasString = result ? result.html().trim().includes('9789722071550') : false;
            expect(hasString).equal(true);
        });
    })

    it('Should have 344 pages', () => {
        books.checkBookData('pageNumber', '344')
        .then((result) => {
            const hasString = result ? result.html().trim().includes('344') : false;
            expect(hasString).equal(true);
        });
    })

    it('Should have "235 x 157 x 23 mm"', () => {
        books.checkBookData('dimensions', '235 x 157 x 23 mm')
        .then((result) => {
            const hasString = result ? result
                .html()
                .trim()
                .replace('\n','')
                .includes('235 x 157 x 23 mm') : false;
            expect(hasString).equal(true);
        });
    })
})

describe('Scenario 3', () => {
    before(() => {
        landingPage.navigates();
    })

    it('Should search for "1984"', () => {
        landingPage.search('1984');
    })

    // the step specificies to search by the name "A Quinta dos Animais" however this book is identified at the website as "O Triunfo dos Porcos"
    it('Should verify that the book "O Triunfo dos Porcos" is from same author', () => {
        books.checkOtherBooksByAuthor('1984', 'O Triunfo dos Porcos')
        .then((result) => {
            const hasString = result ? result.html().trim().includes('O Triunfo dos Porcos') : false;
            expect(hasString).equal(true);
        });
    })
})

describe('Scenario 4', () => {
    before(() => {
        landingPage.navigates();
    })

    it('Should search for "1984"', () => {
        landingPage.search('1984');
    })

    it('Should add the book to the basket', () => {
        books.addBookToBasket('1984');
    })

    it('Should display the number 1 at the basket icon', { defaultCommandTimeout: 6000 }, (done) => {
        cy.wait(1000);
        books.verifyBasket()
        .then(result => {
                expect(result.attr('data-tag')).equal('1');
                books.emptyBasket();
                done();
            }
        );
    })
})

describe('Scenario 5', () => {
    before(() => {
        landingPage.navigates();
    })

    it('Should validate that dark mode is disabled', () => {
        landingPage.headerBackgroundColor().then((result) => {
            expect(result.css('background-color')).equal('rgb(246, 246, 246)');
        })
    })

    it('Should enable dark mode', () => {
        landingPage.enableDarkMode();
    })

    it('Should have enabled dark mode', () => {
        landingPage.headerBackgroundColor().then((result) => {
            expect(result.css('background-color')).equal('rgb(36, 38, 37)');
        })
    })

    after(() => {
        landingPage.enableDarkMode();
    })
})

describe('Scenario 6', () => {

    before(() => {
        landingPage.navigates();
    })

    it('Should return error when loging in with invalid credentials', () => {
       login.goToLogin();
       login.doLogin('test@test.com', '12345');
       login.getMessage().then((result) => console.log('result', result.html()))
    })
})

describe('Scenario 7', () => {

    before(() => {
        landingPage.navigates();
    })

    it('Should return error when trying to recover password with invalid email', () => {
        login.goToLogin();
        login.goToForgotPassword();
        login.doPasswordReset('test@test.com', '12345').then((result) => console.log('result', result.html()))
    })
})