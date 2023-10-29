const emailInput = "input#user_mail";

exports.AccountPage = class AccountPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async getEmail() {
        return this.page.locator(emailInput);
    }

    async goto() {
        await this.page.goto("/account");
    }
};