const { expect } = require('@playwright/test');

exports.AccountPage = class AccountPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input[id=user_mail]');
    }

    async checkEmail(email){
        await expect(this.emailInput).toHaveValue(email);
    }

    async goto() {
        await this.page.goto('/account');
    }
};