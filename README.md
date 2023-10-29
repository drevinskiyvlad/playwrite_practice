# Automated Testing with Playwright
This repository contains a collection of automated tests implemented using the Playwright framework. Playwright is a powerful and versatile end-to-end testing framework that allows you to automate interactions with web applications in Chromium, Firefox, and WebKit browsers.

## Features
* Test scenarios for web applications.
* Automated interactions with web elements such as clicks, form submissions, and navigation.
* Cross-browser testing support for Chromium, Firefox, and WebKit.
* Headless and headful mode testing.

# Getting Started
To get started with the automated tests in this repository, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using npm or yarn:
````
npm install
````
or
````
yarn install
````
3. Configure the test environment and set up the test suite.
4. Run the tests using Playwright's test runner.

## Usage
You can run test in headed or headless mode and get reports of testing
* To run in a headless mode:
```
npx playwright test
```
* To run in a headed mode:
````
npx playwright test --ui
````
* To get reports:
````
npm run report
````

## Configuration
You can configure the test environment and test parameters in the playwright.config.js file. This includes specifying which browsers to use, setting up test fixtures, and more.

## Contributing
Contributions to this repository are welcome! If you want to add new tests, improve existing tests, or contribute in any way, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Create a pull request with a clear description of your changes.