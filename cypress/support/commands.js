// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("fillForm", (user) => {
  if (user.firstName) {
    cy.contains("div", "First or given name...")
      .siblings("input")
      .type(user.firstName);
  }

  if (user.lastName) {
    cy.contains("div", "Last or family name...")
      .siblings("input")
      .type(user.lastName);
  }

  cy.contains("div", "5-digit code...").siblings("input").type(user.zip);

  if (user.email) {
    cy.contains("div", "john@email.com").siblings("input").type(user.email);
  }

  cy.contains("div", "(000) 000-0000").siblings("input").type(user.phone);
});
