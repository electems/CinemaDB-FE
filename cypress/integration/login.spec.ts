import { userAdmin } from './e2e.constants';

describe('React Cypress Test', () => {
  it('Login > Admin', () => {
    cy.visit('http://localhost:3000/admin/login');
    cy.findByRole('textbox', { name: 'Username' }).click();
    cy.findByRole('textbox', { name: 'Username' }).type(userAdmin.username);
    cy.get('div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>input:nth-child(1)').click();
    cy.get('div:nth-child(2)>label:nth-child(1)>div:nth-child(1)>input:nth-child(1)').type(
      userAdmin.password
    );
    cy.findByRole('button', { name: 'Log in' }).click();
  });
});
