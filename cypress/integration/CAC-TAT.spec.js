/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Nunes')
    cy.get('#email').type('matheus.nunesgmail.com')
    cy.get('#open-text-area').type('texto')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('valida que campo de telefone só aceita números', function() {
    cy.get('#phone')
      .type('a-=*/-,.')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Nunes')
    cy.get('#email').type('matheus.nunes@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('texto')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
      .type('Matheus')
      .should('have.value', 'Matheus')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each((radio) => {
        cy.wrap(radio).check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('./cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drops', () => {
    cy.get('#file-upload')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('file')
    cy.get('#file-upload')
      .selectFile('@file')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

})