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

    async getAlert() {
        return this.page.locator(notice);
    }

    async getErrorMessage() {
        return this.page.locator(errorBlock);
    }

    async fillLoginForm(login, password) {
        await this.page.locator(loginField).fill(login);
        await this.page.locator(passwordField).fill(password);
    }

    async clickSubmitButton() {
        await this.page.locator(submitButton).click();
    }

    async goto() {
        await this.page.goto("/login");
    }
};