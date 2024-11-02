// Import Dependencies
const { By, Builder, Browser, until } = require("selenium-webdriver");
const path = require("path");
const assert = require("assert");

// Utility Class of Helper Functions for Testing
class Test {
    static homePagePath = `file://${path.resolve(__dirname, "index.html")}`;
    static driver;

    static async startDriver(browserName) {
        Test.driver = await new Builder().forBrowser(browserName).build();
    }

    static async stopDriver() {
        await Test.driver.quit();
    }

    static async navToHomePage() {
        await Test.driver.get(Test.homePagePath);
    }

    static async test1() {
        // Navigate to the home page
        await Test.navToHomePage();

        // Assert that the email address input is present
        const emailInput = await Test.driver.findElement(By.xpath('//div[@id="test-1-div"]//form[@class="form-signin"]//input[@id="inputEmail"]'));
        const emailIsPresent = await emailInput.isDisplayed();
        assert.strictEqual(emailIsPresent, true, "Email input must be present in the Home page under Test 1");
    
        // Assert that the password input is present
        const passwordInput = await Test.driver.findElement(By.xpath('//div[@id="test-1-div"]//form[@class="form-signin"]//input[@id="inputPassword"]'));
        const passwordIsPresent = await passwordInput.isDisplayed();
        assert.strictEqual(passwordIsPresent, true, "Password input must be present in the Home page under Test 1");
    
        // Assert that the login button is present
        const loginButton = await Test.driver.findElement(By.xpath('//div[@id="test-1-div"]//form[@class="form-signin"]//button[@type="submit"]'));
        const loginButtonIsPresent = await loginButton.isDisplayed();
        assert.strictEqual(loginButtonIsPresent, true, "Login button must be present in the Home page under Test 1");
    
        // Enter in an email address and password
        const exampleEmail = "tonyphan05052003@gmail.com";
        await emailInput.sendKeys(exampleEmail);
        const examplePassword = "HelloThere$050503@";
        await passwordInput.sendKeys(examplePassword);
        const email = await emailInput.getAttribute("value");
        const password = await passwordInput.getAttribute("value");
        assert.strictEqual(email, exampleEmail, "User should be able to enter email address in the email address input under Test 1");
        assert.strictEqual(password, examplePassword, "User should be able to enter password in the password input under Test 1");
    }

    static async test2() {
        // Navigate to the home page
        await Test.navToHomePage();

        // Assert that there are three values in the list group
        const items = await Test.driver.findElements(By.xpath('//div[@id="test-2-div"]//ul[@class="list-group"]//li'));
        assert.strictEqual(items.length, 3, "There should be three values in the list group under Test 2");

        // Assert that the second list item's value is set to "List Item 2"
        const itemValue = "List Item 2";
        const item2 = items[1];

        let secondListItemValue = await item2.getText();
        const secondListItemBadge = await item2.findElement(By.xpath('.//span'));
        const secondListItemBadgeValue = await secondListItemBadge.getText();

        secondListItemValue = secondListItemValue.replace(secondListItemBadgeValue, '');
        secondListItemValue = secondListItemValue.trim().replace(/[^a-zA-Z0-9\s]/g, "");

        assert.strictEqual(secondListItemValue, itemValue, "The second list item's value should be 'List Item 2' under Test 2");

        // Assert that the second list item's badge value is 6
        const badgeValue = '6';
        assert.strictEqual(secondListItemBadgeValue.trim(), badgeValue, "The second list item's badge value should be 6 under Test 2");
    }

    static async test3() {
        // Navigate to the home page
        await Test.navToHomePage();

        // Assert that "Option 1" is the default selected value
        const defaultOption = "Option 1";
        const dropdownButton = await Test.driver.findElement(By.xpath('//div[@id="test-3-div"]//div[@class="dropdown"]//button[@id="dropdownMenuButton"]'));
        const displayedOption = await dropdownButton.getText();
        assert.strictEqual(displayedOption.trim(), defaultOption, "'Option 1' should be the default selected value under Test 2");

        // Select "Option 3" from the select list
        await dropdownButton.click();
        const option3 = await Test.driver.findElement(By.xpath('//a[@class="dropdown-item" and text()="Option 3"]'));
        await option3.click();
        const selectedOption = await dropdownButton.getText();
        const option3Value = await option3.getAttribute("innerHTML");
        assert.strictEqual(selectedOption.trim(), option3Value.trim(), "'Option 3' should be selected by the end of Test 2");
    }

    static async test4() {
        // Navigate to the home page
        await Test.navToHomePage();

        // Assert that the first button is enabled
        const firstButton = await Test.driver.findElement(By.xpath('//div[@id="test-4-div"]//button[@class="btn btn-lg btn-primary"]'));
        const firstButtonIsEnabled = await firstButton.isEnabled();
        assert.strictEqual(firstButtonIsEnabled, true, "The 1st button should be enabled under Test 4");

        // Assert that the second button is disabled
        const secondButton = await Test.driver.findElement(By.xpath('//div[@id="test-4-div"]//button[@class="btn btn-lg btn-secondary"]'));
        const secondButtonIsEnabled = await secondButton.isEnabled();
        assert.strictEqual(secondButtonIsEnabled, false, "The 2nd button should be disabled under Test 4");
    }

    static async test5() {
        // Navigate to the home page
        await Test.navToHomePage();

        // Wait for a button to be displayed (note: the delay is random) and then click it
        const maxWaitTime = 11000; 
        const test5Button = await Test.driver.findElement(By.id("test5-button"));
        await Test.driver.wait(until.elementIsVisible(test5Button), maxWaitTime);
        await Test.driver.executeScript("arguments[0].click();", test5Button);
        
        // Once the button is clicked, assert that a success message is displayed
        const successAlertMessage = await Test.driver.findElement(By.xpath('//div[@id="test-5-div"]//div[@id="test5-alert"]'));
        const alertIsPresent = await successAlertMessage.isDisplayed();
        assert.strictEqual(alertIsPresent, true, "An alert should be displayed after the button is clicked under Test 5");
        const alertText = await successAlertMessage.getText();
        assert.notEqual(alertText.trim().length, 0, "An alert should have some text under Test 5");
        
        // Assert that the button is now disabled
        const buttonIsEnabled = await test5Button.isEnabled();
        assert.strictEqual(buttonIsEnabled, false, "Button should be disabled after alert is displayed under Test 5");
    }

    static async test6() {
        // Navigate to the home page
        await Test.navToHomePage();

        // Assert that the value of the cell at coordinates 2, 2 is "Ventosanzap" (staring at 0 in the top left corner)
        const cellValue = await Test.retrieveCellValue(2, 2);
        const expectedCellValue = "Ventosanzap";
        assert.strictEqual(cellValue, expectedCellValue, "The cell at (2,2) should have the value of 'Ventosanzap' under Test 6");
    }

    static async retrieveCellValue(r, c) {
        const rows = await Test.driver.findElements(By.xpath('//div[@id="test-6-div"]//table//tbody//tr'));
        const row = rows[r];
        const columns = await row.findElements(By.xpath('.//td'));
        const cell = columns[c];
        const cellValue = await cell.getText();
        return cellValue;
    }

    static runTests(browserName) {
        before(async () => await Test.startDriver(browserName));
        after(async () => await Test.stopDriver());
        it("Test 1", Test.test1);
        it("Test 2", Test.test2);
        it("Test 3", Test.test3);
        it("Test 4", Test.test4);
        it("Test 5", Test.test5);
        it("Test 6", Test.test6);
    }
}

// Run Individual Tests for Home Page on Safari
describe("Tests for Home Page on Safari", function () {Test.runTests(Browser.SAFARI)});

// Run Individual Tests for Home Page on Chrome
// describe("Tests for Home Page on Chrome", function () {Test.runTests(Browser.CHROME)});

// Run Individual Tests for Home Page on Microsoft Edge
// describe("Tests for Home Page on Microsoft Edge", function () {Test.runTests(Browser.EDGE)});

// Run Individual Tests for Home Page on Firefox
// describe("Tests for Home Page on Firefox", function () {Test.runTests(Browser.FIREFOX)});