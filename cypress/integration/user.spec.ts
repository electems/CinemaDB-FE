import { admin } from "./models"
  const baseUrl = "http://localhost:3001"
  
  describe('Home', () => {
    it('CinemaDb > Login > AdminLogin', () => {
    
      cy.visit(`/admin/login`)
      cy.get('[id="userName"]').eq(0).focus().type(admin.username)
      cy.get('[id="password"]').eq(0).focus().type(admin.password)
      cy.get('[id="login"]').click()
    })
});
describe('UsertemplateSectionTest', () => {
  it('UserTemplate', () => {
    cy.visit('/admin/user')
    cy.get('[id="addUser"]').click()
  })
})