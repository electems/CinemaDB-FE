import { admin, userDataToCreate, userDataToUpadet } from "./models";

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
    localStorage.setItem("@cinimaDb:Token", resp.body.token);
  });
});
describe("AdminLogin", () => {
  it("CinemaDb > Login > AdminLogin", () => {
    cy.visit(`/admin/login`);
    cy.get('[id="userName"]').eq(0).focus().type(admin.username);
    cy.get('[id="password"]').eq(0).focus().type(admin.password);
    cy.get('[id="login"]').click();
  });
});
describe("AdminUserSection", () => {
  it("UserCreateSection", () => {
    cy.visit("/admin/userListing");
    cy.get('[id="addUser"]').click();
    cy.get('input[id*="firstName"]').click().type(userDataToCreate.firstName);
    cy.get('input[id*="lastName"]').click().type(userDataToCreate.lastName);
    cy.get('input[id*="email"]').click().type(userDataToCreate.email);
    cy.get('input[id*="password"]').click().type(userDataToCreate.password);
    cy.get('input[id*="status"]').click();
    cy.get("body").click(50, 50, { force: true });
    cy.get('input[id*="filmIndustry"]').click();
    cy.get("body").click(50, 50, { force: true });
    cy.get('input[id*="role"]').click();
    cy.get("body").click(50, 50, { force: true });
    cy.get('[id="saveUser"]').click();
  });
  it("UserEditSection", () => {
    cy.get('[id="editUser"]').eq(2).click();
    cy.get('input[id*="firstName"]').click().clear({ force: true });
    cy.get('input[id*="firstName"]').click().type(userDataToCreate.firstName);
    cy.get('input[id*="lastName"]').click().clear({ force: true });
    cy.get('input[id*="lastName"]').click().type(userDataToCreate.lastName);
    cy.get('input[id*="email"]').click().clear({ force: true });
    cy.get('input[id*="email"]').click().type(userDataToCreate.email);
    cy.get('input[id*="password"]').click().clear({ force: true });
    cy.get('input[id*="password"]').click().type(userDataToCreate.password);
    cy.get('input[id*="status"]').click().clear({ force: true });
    cy.get("body").click(50, 50, { force: true });
    cy.get('input[id*="filmIndustry"]').click().clear({ force: true });
    cy.get("body").click(50, 50, { force: true });
    cy.get('input[id*="role"]').click().clear({ force: true });
    cy.get("body").click(50, 50, { force: true });
    cy.get('[id="cancle"]').click();
  });
  it("UserSearchSection", () => {
    cy.get('[ id="searchBar"]').click().type(userDataToCreate.firstName);
    cy.get('[ id="searchButton"]').click();
  });

  it("adminLogout", () => {
    cy.get('[ id="logout"]').click();
  });
});
