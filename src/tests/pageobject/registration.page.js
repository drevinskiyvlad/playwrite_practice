const {expect} = require('@playwright/test');

const loginField = "#user_login";
const passwordField = "#user_password";
const passwordConfirmationField = "#user_password_confirmation";
const firstNameField = "#user_firstname";
const lastNameField = "#user_lastname";
const emailField = "#user_mail";
const submitButton = "input:has-text('Submit')";
const errorBlock = "#errorExplanation";

exports.RegistrationPage = class RegistrationPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async fillRegistrationForm(login, password, passwordConfirmation, firstName, lastName, email) {
        await this.page.locator(loginField).fill(login);
        await this.page.locator(passwordField).fill(password);
        await this.page.locator(passwordConfirmationField).fill(passwordConfirmation);
        await this.page.locator(firstNameField).fill(firstName);
        await this.page.locator(lastNameField).fill(lastName);
        await this.page.locator(emailField).fill(email);
    }

    async isErrorMessageVisible(){
        await expect(this.page.locator(errorBlock)).toBeVisible();
    }

    async checkTextInElements(textArray) {
        for (let i = 0; i < textArray.length; i++) {
            const element = this.page.locator(`#errorExplanation li:nth-child(${i + 1})`);
            await expect(element).toHaveText(textArray[i]);
        }
    }

    async checkIfFieldsColored(fields) {
        for (const field of fields) {
            const element = this.page.locator(`label.error:has-text("${field}")`);
            await expect(element).toHaveCSS("color", "rgb(187, 0, 0)");
        }
    }

    async clickSubmitButton() {
        await this.page.locator(submitButton).click();
    }

    async goto() {
        await this.page.goto('/account/register');
    }
};