const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.notice = page.locator('id=flash_notice');
        this.errorBlock = page.locator('id=flash_error');
        this.loginField = page.locator('id=username');
        this.passwordField = page.locator('id=password');
        this.submitButton = page.locator('input[id=login-submit]');
    }

    async fillLoginForm(login, password) {
        await this.loginField.fill(login);
        await this.passwordField.fill(password);
    }

    async checkAlert(message){
        await expect(this.notice).toContainText(message)
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }

    async checkErrorMessage(message){
        await expect(this.errorBlock).toBeVisible();
        await expect(this.errorBlock).toHaveText(message);
    }

    async goto() {
        await this.page.goto('/login');
    }
};