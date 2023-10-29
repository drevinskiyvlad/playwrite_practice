const {expect} = require('@playwright/test');

const emailInput = "input#user_mail";

exports.AccountPage = class AccountPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async checkEmail(email) {
        await expect(this.page.locator(emailInput)).toHaveValue(email);
    }

    async goto() {
        await this.page.goto("/account");
    }
};