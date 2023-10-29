const accountText = "#loggedas";
const accountButton = "a.my-account";

exports.MainPage = class MainPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async getAccountText() {
        return this.page.locator(accountText);
    }

    async clickMyAccount() {
        await this.page.locator(accountButton).click();
    }

    async goto() {
        await this.page.goto("/");
    }
};