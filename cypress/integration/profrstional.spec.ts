import { admin } from './models'
import { faker } from '@faker-js/faker'

const baseURL = 'http://localhost:3001/auth/login'

let token = ''
beforeEach(() => {
  cy.request({
    method: 'POST',
    url: baseURL,
    body: {
      username: admin.username,
      password: admin.password
    }
  }).then((resp) => {
    token = resp.body.token
    localStorage.setItem('@cinimaDb:Token', token)
  })
})
describe('AdminLogin', () => {
  it('CinemaDb > Login > AdminLogin', () => {
    cy.visit('/admin/login')
    cy.get('[id="userName"]').eq(0).focus().type(admin.username)
    cy.get('[id="password"]').eq(0).focus().type(admin.password)
    cy.get('[id="login"]').click()
    console.log(localStorage.getItem('@cinimaDb:Token'))
  })

  it('Admin > ProfessionalListing > Add Tree', () => {
    cy.get('[id="professional"]').click()
    cy.visit('http://localhost:3000/admin/professionalListing')
    cy.get('[id="professionalList"]').contains('Core Professional List')
    cy.get('span[title="Ad agency / Promoter"]>span:nth-child(1)>div:nth-child(1)>div:nth-child(2)>button:nth-child(2)>svg:nth-child(1)>path:nth-child(8)').click()
    cy.get('div:nth-child(1)>svg:nth-child(1)').click()
    cy.get('button:nth-child(1)>svg:nth-child(1)>path:nth-child(2)').click()
    cy.get('span:nth-child(1)>div:nth-child(1)>div:nth-child(1)>input:nth-child(1)').click()
    cy.get('span:nth-child(1)>div:nth-child(1)>div:nth-child(1)>input:nth-child(1)').type('Adagency')
    cy.get('div:nth-child(1)>div:nth-child(1)>div:nth-child(2)>button:nth-child(1)>svg:nth-child(1)').click()
    cy.get('span[title="Ad agency / Promoter"]>span:nth-child(1)>div:nth-child(1)>div:nth-child(2)>button:nth-child(1)>svg:nth-child(1)').click()
    cy.get('span:nth-child(1)>div:nth-child(1)>div:nth-child(1)>input:nth-child(1)').type('Agency')
    cy.get('button:nth-child(1)>svg:nth-child(1)>path:nth-child(1)').click()
    cy.get('div:nth-child(3)>span:nth-child(2)>div:nth-child(1)>svg:nth-child(1)').click()
    cy.get('span[title="Ad agency / Promoter"]>span:nth-child(1)>div:nth-child(1)>div:nth-child(2)>button:nth-child(1)>svg:nth-child(1)').click()
    cy.get('span:nth-child(1)>div:nth-child(1)>div:nth-child(1)>input:nth-child(1)').type('Promoter')
    cy.get('button:nth-child(1)>svg:nth-child(1)>path:nth-child(1)').click()
    cy.get('div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)').click()
    cy.get('div:nth-child(5)>button:nth-child(2)').click()
  })
 
})
