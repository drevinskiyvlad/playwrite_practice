const { expect } = require('@playwright/test');

exports.MainPage = class MainPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.accountText = page.locator('id=loggedas');
        this.accountButton = page.locator('a[class=my-account]');
        this.emailInput = page.locator('input[id=user_mail]');
    }

    async isAccountTextVisible(){
        await expect(this.accountText).toBeVisible();
    }

    async clickMyAccount(){
        await this.accountButton.click();
    }

    async goto() {
        await this.page.goto('/');
    }
};