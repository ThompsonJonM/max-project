import { REQUIRED_MESSAGE, THANK_YOU_MESSAGE } from "../../support/constants";

const requiredFields = ["firstName", "lastName", "email"];

describe("Riley Green Web App Tests", () => {
  beforeEach("Navigate to the Riley Green web app", () => {
    cy.visit(Cypress.config("baseUrl"));
  });

  specify.only("As a user, I should be able to input valid data", () => {
    cy.fixture("users.json").then(($json) => {
      cy.fillForm($json.users.validUser);
    });

    cy.contains("label", "I agree to the terms and conditions").within(() => {
      cy.get("[type=checkbox]").click({ force: true });
    });

    cy.contains("button", "Submit").click();

    cy.intercept("**/leads-submit", ($req) => {
      $req.reply(($res) => {
        expect($res.body.result.success).to.eq(true);
      });
    });

    cy.contains("div", THANK_YOU_MESSAGE).should("be.visible");
  });

  specify("As a user, I must agree to terms to submit", () => {
    cy.fixture("users.json").then(($json) => {
      cy.fillForm($json.users.validUser);
    });

    cy.contains("button", "Submit").click();

    cy.contains("p", REQUIRED_MESSAGE).should("be.visible");
  });

  requiredFields.forEach(($field) => {
    specify(`As a user, I must fill out the ${$field} field`, () => {
      cy.fixture("users.json").then(($json) => {
        delete $json.users.validUser[$field];

        cy.fillForm($json.users.validUser);
      });

      cy.contains("button", "Submit").click();

      cy.contains("p", REQUIRED_MESSAGE).should("be.visible");
    });
  });
});
