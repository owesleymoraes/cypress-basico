///<reference types="Cypress"/>
import { faker } from '@faker-js/faker'

describe("Central de atendimento ao cliente TAT", () => {
    beforeEach(() => {
        cy.visit('./src/index.html')

    })

    let nameFaker = faker.internet.userName()
    let lastNameFaker = faker.internet.userName()
    let emailFaker = faker.internet.email()
    let phoneFaker = faker.phone.number()
    let textFaker = faker.lorem.paragraph()

    beforeEach(() => {
        cy.get('#firstName').type(nameFaker)
        cy.get('#lastName').type(lastNameFaker)
        cy.get('#email').type(emailFaker)
        cy.get('#phone').type(phoneFaker)
        cy.get('#open-text-area').type(textFaker, { delay: 0 })
        cy.get('button[type="submit"]').click()
    })

    it('Verifica o título do aplicativo', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it("Preenche os campos obrigatórios e envia o formulário", () => {


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

    it.only('Deve mostrar mensagem de erro quando o telefone se torna obrigratório mas não foi preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Wesley')
        cy.get('#lastName').type('Moraes')
        cy.get('#email').type('wesleyjava88@gmail,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("test")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Deve preencher e limpar os campos nome,email,telefone', () => {
        cy.get('#firstName').type('Wesley').clear().should('have.text', '')
        cy.get('#lastName').type('Moraes').clear().should('have.text', '')
        cy.get('#email').type('wesleyjava88@gmail,com').clear().should('have.text', '')
        cy.get('#phone').type('3243-3488').clear().should('have.text', '')
    })

    it('Deve mostrar mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Deve enviar o formulário com sucesso usando um comando customizado', () => {

        cy.get('.success').should('be.visible')
    })
})