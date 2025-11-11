const { Builder } = require('selenium-webdriver');
require('chromedriver');

async function checkSetup() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000');
    console.log('✓ Selenium setup successful!');
    await driver.quit();
}

checkSetup();
