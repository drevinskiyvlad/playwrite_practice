const {test} = require('@playwright/test');
const {Faker} = require('../helper/faker');
const {RegistrationPage} = require('../pageobject/registration.page');
const {LoginPage} = require('../pageobject/login.page');
const {MainPage} = require('../pageobject/main.page');
const {AccountPage} = require('../pageobject/account.page');

test.describe('Login', () => {
    test('Registration with valid credentials', async ({page}) => {
        const registrationPage = new RegistrationPage(page);
        const loginPage = new LoginPage(page);

        const login = Faker.generateRandomString(8);
        const email = Faker.generateValidEmail();

        await registrationPage.goto();
        await registrationPage.fillRegistrationForm(login, "12345678", "12345678", "John", "Doe", email)
        await registrationPage.clickSubmitButton();
        await loginPage.checkAlert("Account was successfully created");
    });

    test('Registration with empty fields', async ({page}) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.goto();
        await registrationPage.clickSubmitButton();
        await registrationPage.isErrorMessageVisible()
        await registrationPage.checkIfFieldsColored(["Login", "Password", "First name", "Last name"]);
    });

    test('Registration with invalid credentials', async ({page}) => {
        const registrationPage = new RegistrationPage(page);

        const password = Faker.generateRandomString(4);
        const email = Faker.generateInvalidEmail();

        await registrationPage.goto();
        await registrationPage.fillRegistrationForm("Test", "1", password, "John", "Doe", email)
        await registrationPage.clickSubmitButton();
        await registrationPage.checkTextInElements(["Email is invalid", "Login has already been taken", "Password is too short (minimum is 8 characters)"]);
        await registrationPage.checkIfFieldsColored(["Login", "Password"]);
    });

    test('Login with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        const mainPage = new MainPage(page);
        const accountPage = new AccountPage(page);

        await loginPage.goto();
        await loginPage.fillLoginForm("Test12423423423", "12345678")
        await loginPage.clickSubmitButton();
        await mainPage.isAccountTextVisible();
        await mainPage.clickMyAccount();
        await accountPage.checkEmail("drevinskiy99.vd@gmail.com");
    });

    test('Login with invalid login', async ({page}) => {
        const loginPage = new LoginPage(page);

        const login = Faker.generateRandomString(8);
        const password = Faker.generateRandomString(4);

        await loginPage.goto();
        await loginPage.fillLoginForm(login, password);
        await loginPage.clickSubmitButton();
        await loginPage.checkErrorMessage("Invalid user or password");
    });



});