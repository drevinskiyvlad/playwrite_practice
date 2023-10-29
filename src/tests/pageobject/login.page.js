const {expect} = require('@playwright/test');

const notice = "#flash_notice";
const errorBlock = "#flash_error";
const loginField = "#username";
const passwordField = "#password";
const submitButton = "input#login-submit";

exports.LoginPage = class LoginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async fillLoginForm(login, password) {
        await this.page.locator(loginField).fill(login);
        await this.page.locator(passwordField).fill(password);
    }

    async checkAlert(message) {
        await expect(this.page.locator(notice)).toContainText(message)
    }

    async clickSubmitButton() {
        await this.page.locator(submitButton).click();
    }

    async checkErrorMessage(message) {
        await expect(this.page.locator(errorBlock)).toBeVisible();
        await expect(this.page.locator(errorBlock)).toHaveText(message);
    }

    async goto() {
        await this.page.goto("/login");
    }
};