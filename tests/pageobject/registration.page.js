const {expect} = require('@playwright/test');

exports.RegistrationPage = class RegistrationPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.loginField = page.locator('id=user_login');
        this.passwordField = page.locator('id=user_password');
        this.passwordConfirmationField = page.locator('id=user_password_confirmation');
        this.firstNameField = page.locator('id=user_firstname');
        this.lastNameField = page.locator('id=user_lastname');
        this.emailField = page.locator('id=user_mail');
        this.submitButton = page.locator('input:has-text("Submit")');
        this.errorBlock = page.locator('id=errorExplanation');
    }

    async fillRegistrationForm(login, password, passwordConfirmation, firstName, lastName, email) {
        await this.loginField.fill(login);
        await this.passwordField.fill(password);
        await this.passwordConfirmationField.fill(passwordConfirmation);
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
    }

    async isErrorMessageVisible(){
        await expect(this.errorBlock).toBeVisible();
    }

    async checkTextInElements(textArray) {
        for (let i = 0; i < textArray.length; i++) {
            const selector = `div[id='errorExplanation'] li:nth-child(${i + 1})`;
            const element = this.page.locator("css=" + selector);
            await expect(element).toHaveText(textArray[i]);
        }
    }

    async checkIfFieldsColored(fields){
        for (const field of fields) {
            const selector = `label[class='error']:has-text("${field}")`;
            const element = this.page.locator(selector);
            await expect(element).toHaveCSS("color", "rgb(187, 0, 0)");
        }
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async goto() {
        await this.page.goto('/account/register');
    }
};