///<reference types="Cypress"/>

describe("Central de atendimento ao cliente TAT", () => {
    beforeEach(() => {
        cy.visit('./src/index.html')

    })

    it('Verifica o título do aplicativo', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only("Preenche os campos obrigatórios e envia o formulário", () => {
        cy.get('#firstName').type('Wesley')
        cy.get('#lastName').type('Moraes')
        cy.get('#email').type('wesleyjava88@gmail.com')
        cy.get('#phone').type('3243-3488')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })
})