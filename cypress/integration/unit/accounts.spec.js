import {
  checkPassword,
  hashPassword,
  verifyEmail,
  verifyPassword,
} from "../../../accounts";
import filterTests from "../../plugins/filterTests";

const BANNED_EMAILS = [
  "0wnd.net",
  "devnullmail.com",
  "dispose.it",
  "gotmail.org",
  "nospamfor.us",
  "spamgoes.in",
  "supermailer.jp",
  "tempmail.eu",
  "throwawayemailaddress.com",
  "trashmail.me",
];
const INVALID_PASSWORDS = ["test1234!", "testtesting!", "test1234", "test"];

filterTests(["all", "unit"], () => {
  describe("Unit Test Accounts Code", () => {
    context("Verify Email", () => {
      before(() => {
        expect(verifyEmail, "verifyEmail").to.be.a("function");
      });

      specify("Valid email returns true", () => {
        expect(verifyEmail("test@test.com")).to.eq(true);
      });

      specify("Null email returns false", () => {
        expect(verifyEmail()).to.eq(false);
      });

      specify("Invalid email format returns false", () => {
        expect(verifyEmail("test.test.com")).to.eq(false);
      });

      BANNED_EMAILS.forEach(($domain) => {
        specify(`Banned domain: ${$domain} returns false`, () => {
          expect(verifyEmail(`test@${$domain}`)).to.eq(false);
        });
      });
    });

    context("Verify Password", () => {
      specify("Valid password returns true", () => {
        expect(verifyPassword("Test1234!")).to.eq(true);
      });

      specify("Null password returns false", () => {
        expect(verifyPassword()).to.eq(false);
      });

      INVALID_PASSWORDS.forEach(($password) => {
        specify(`Invalid password: ${$password} returns false`, () => {
          expect(verifyPassword($password)).to.eq(false);
        });
      });
    });

    context("Hash Password", () => {
      specify("Valid password returns a value", () => {
        const password = hashPassword("test");

        expect(!!password).to.eq(true);
      });

      specify("Null password returns error", () => {
        try {
          hashPassword(null);
        } catch ($error) {
          expect(!!$error).to.eq(true);
        }
      });
    });

    context("Check Password", () => {
      specify("Valid check returns true", () => {
        const password = "test";
        const hash = hashPassword("test");

        expect(checkPassword(password, hash)).to.eq(true);
      });

      specify("Invalid check returns false", () => {
        const password = "test";
        const hash = hashPassword("testing");

        expect(checkPassword(password, hash)).to.eq(false);
      });

      specify("Null check returns error", () => {
        try {
          checkPassword(null);
        } catch ($error) {
          expect(!!$error).to.eq(true);
        }
      });
    });
  });
});
