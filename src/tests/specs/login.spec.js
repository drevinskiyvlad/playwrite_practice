import data from '../../data/data.json'
import alerts from '../../data/alerts.json'
import fields from '../../data/fields.json'

const {test} = require('@playwright/test');
const {Faker} = require('../../helper/faker');
const {RegistrationPage} = require('../pageobject/registration.page');
const {LoginPage} = require('../pageobject/login.page');
const {MainPage} = require('../pageobject/main.page');
const {AccountPage} = require('../pageobject/account.page');

test.describe('Login', () => {

    test('Registration with valid credentials', async ({page}) => {
        const registrationPage = new RegistrationPage(page);
        const loginPage = new LoginPage(page);

        const login = Faker.generateRandomString(8);
        const password = Faker.generateRandomString(8);
        const firstName = Faker.generateRandomString(4);
        const lastName = Faker.generateRandomString(4);
        const email = Faker.generateValidEmail();

        await registrationPage.goto();
        await registrationPage.fillRegistrationForm(login, password, password, firstName, lastName, email)
        await registrationPage.clickSubmitButton();
        await loginPage.checkAlert(alerts.successfull_registration);
    });

    test('Registration with empty fields', async ({page}) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.goto();
        await registrationPage.clickSubmitButton();
        await registrationPage.isErrorMessageVisible();
        await registrationPage.checkIfFieldsColored([fields.login,
            fields.password,
            fields.first_name,
            fields.last_name]);
    });

    test('Registration with invalid credentials', async ({page}) => {
        const registrationPage = new RegistrationPage(page);

        const login = "Test"
        const password = Faker.generateRandomString(4);
        const firstName = Faker.generateRandomString(4);
        const lastName = Faker.generateRandomString(4);
        const email = Faker.generateInvalidEmail();

        await registrationPage.goto();
        await registrationPage.fillRegistrationForm(login, password, password, firstName, lastName, email)
        await registrationPage.clickSubmitButton();
        await registrationPage.checkTextInElements(
            [alerts.invalid_email,
                alerts.taken_login,
                alerts.invalid_password]);
        await registrationPage.checkIfFieldsColored([fields.login, fields.password]);
    });

    test('Login with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        const mainPage = new MainPage(page);
        const accountPage = new AccountPage(page);

        const login = data.valid_login;
        const password = data.password
        const email = data.valid_email

        await loginPage.goto();
        await loginPage.fillLoginForm(login, password)
        await loginPage.clickSubmitButton();
        await mainPage.isAccountTextVisible();
        await mainPage.clickMyAccount();
        await accountPage.checkEmail(email);
    });

    test('Login with invalid login', async ({page}) => {
        const loginPage = new LoginPage(page);

        const login = Faker.generateRandomString(8);
        const password = Faker.generateRandomString(4);

        await loginPage.goto();
        await loginPage.fillLoginForm(login, password);
        await loginPage.clickSubmitButton();
        await loginPage.checkErrorMessage(alerts.invalid_user);
    });
});