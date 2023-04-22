import { admin } from "./models";
import { faker } from "@faker-js/faker";

const baseURL = "http://localhost:3001/auth/login";

let token = "";
beforeEach(() => {
  cy.request({
    method: "POST",
    url: baseURL,
    body: {
      username: admin.username,
      password: admin.password,
    },
  }).then((resp) => {
    token = resp.body.token;
    localStorage.setItem("@cinimaDb:Token", token);
  });
});
describe("AdminLogin", () => {
  it("CinemaDb > Login > AdminLogin", () => {
    cy.visit(`/admin/login`);
    cy.get('[id="userName"]').eq(0).focus().type(admin.username);
    cy.get('[id="password"]').eq(0).focus().type(admin.password);
    cy.get('[id="login"]').click();
    console.log(localStorage.getItem("@cinimaDb:Token"));
  });

  it("Core Professional List", () => {
    cy.get('[id="professional"]').click();
    cy.get('[id="professionalList"]').contains("Core Professional List");
    cy.get('[id="tableTitle"]').contains("Main Professional");
    cy.get('[id="editIndustry"]').eq(1).click();
    cy.get('[id="profcancle"]').click();
    cy.get('[id="editIndustry"]').eq(0).click();
    cy.get('[id="popupButton"]').contains("choice").click();
    cy.get('[id="userinput"]').click().type(faker.lorem.word());
    cy.get('[id="addChild"]').click();
  });
});
