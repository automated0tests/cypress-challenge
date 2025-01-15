const elements = require('./elements').elements;

class Login {

    goToLogin() {
        cy
            .get(elements.goToLogin)
            .click();
    }

    doLogin(email, password) {
        cy
        .get(elements.emailInput)
        .type(email)
        .get(elements.passwordInput)
        .type(password)
        
        cy.get(elements.loginButton)
        .click();
    }

    getMessage() {
        return cy.get(elements.errorMessage)
        .contains('Login inválido!')
    }

    goToForgotPassword() {
        cy.get(elements.forgotPassword)
        .click();
    }

    doPasswordReset(email) {
        cy.get(elements.emailInput)
        .type(email)

        cy.get(elements.loginButton)
        .click()

        return cy.get(elements.errorMessage)
        .contains('Não existe nenhum registo com o e-mail especificado.')
    }


}

export default new Login();