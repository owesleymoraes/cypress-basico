///<reference types="Cypress"/>

describe("Central de atendimento ao cliente TAT", () => {
    beforeEach(() => {
        cy.visit('./src/index.html')

    })

    it('Verifica o título do aplicativo', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it("Preenche os campos obrigatórios e envia o formulário", () => {
        const longText = 'text, text text text texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext texttext text'
        cy.get('#firstName').type('Wesley')
        cy.get('#lastName').type('Moraes')
        cy.get('#email').type('wesleyjava88@gmail.com')
        cy.get('#phone').type('3243-3488')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it("Deve mostrar mesagem de erro ao submenter o formulário com email em formatação errada", () => {
       
        cy.get('#firstName').type('Wesley')
        cy.get('#lastName').type('Moraes')
        cy.get('#email').type('wesleyjava88@gmail,com')
        cy.get('#phone').type('3243-3488')
        cy.get('#open-text-area').type("test")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Deve mostrar campo telefone vazio quando digitos forem diferentes de números', () => {
        cy.get('#phone').type('abc')
        cy.get('#phone').should('have.text', '')
    })

    it('Deve mostrar mensagem de erro quando o telefone se torna obrigratório mas não foi preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Wesley')
        cy.get('#lastName').type('Moraes')
        cy.get('#email').type('wesleyjava88@gmail,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("test")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it.only('Deve preencher e limpar os campos nome,email,telefone',()=>{
        cy.get('#firstName').type('Wesley').clear().should('have.text','')
        cy.get('#lastName').type('Moraes').clear().should('have.text','')
        cy.get('#email').type('wesleyjava88@gmail,com').clear().should('have.text','')
        cy.get('#phone').type('3243-3488').clear().should('have.text','')
    })


})