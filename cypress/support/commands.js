Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { 
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Nunes')
    cy.get('#email').type('matheus.nunes@gmail.com')
    cy.get('#open-text-area').type('texto')
    cy.get('button[type="submit"]').click()  
})

