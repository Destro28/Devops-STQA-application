const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

const BASE_URL = 'http://localhost:3000';
let driver;

const fs = require('fs');
const path = require('path');

function clearUsers() {
    const usersPath = path.join(__dirname, '../backend/data/users.json');
    fs.writeFileSync(usersPath, '[]');
    console.log('✓ Cleared users.json\n');
}
//adding a small comment here to test git changes
// Test Case 1: Valid Registration
async function testValidRegistration() {
    console.log('=== TEST CASE 1: TC_REG_001 - Valid Registration ===');
    try {
        await driver.get(`${BASE_URL}/register.html`);
        await driver.sleep(2000);
        
        const username = await driver.wait(until.elementLocated(By.id('username')), 5000);
        await username.sendKeys('testuser123');
        
        const email = await driver.wait(until.elementLocated(By.id('email')), 5000);
        await email.sendKeys('testuser@example.com');
        
        const password = await driver.wait(until.elementLocated(By.id('password')), 5000);
        await password.sendKeys('Test@1234');
        
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();
        
        await driver.sleep(2000);
        const message = await driver.findElement(By.id('message')).getText();
        
        if (message.includes('successfully')) {
            console.log('✓ PASS: Registration successful');
            console.log(`  Message: "${message}"`);
        } else {
            console.log('✗ FAIL: Unexpected message:', message);
        }
        
        await driver.sleep(2000);
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('login.html')) {
            console.log('✓ PASS: Redirected to login page\n');
        } else {
            console.log('✗ FAIL: Did not redirect to login\n');
        }
        
    } catch (error) {
        console.log('✗ FAIL: Error -', error.message, '\n');
    }
}

// Test Case 2: Duplicate Registration
async function testDuplicateRegistration() {
    console.log('=== TEST CASE 2: TC_REG_002 - Duplicate Email Registration ===');
    try {
        await driver.get(`${BASE_URL}/register.html`);
        await driver.sleep(2000);
        
        const username = await driver.wait(until.elementLocated(By.id('username')), 5000);
        await username.sendKeys('newuser');
        
        const email = await driver.wait(until.elementLocated(By.id('email')), 5000);
        await email.sendKeys('testuser@example.com');
        
        const password = await driver.wait(until.elementLocated(By.id('password')), 5000);
        await password.sendKeys('Test@5678');
        
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();
        
        await driver.sleep(2000);
        const message = await driver.findElement(By.id('message')).getText();
        
        if (message.includes('already exists')) {
            console.log('✓ PASS: Duplicate registration prevented');
            console.log(`  Message: "${message}"`);
        } else {
            console.log('✗ FAIL: Unexpected message:', message);
        }
        
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('register.html')) {
            console.log('✓ PASS: Remained on registration page\n');
        } else {
            console.log('✗ FAIL: Unexpected redirect\n');
        }
        
    } catch (error) {
        console.log('✗ FAIL: Error -', error.message, '\n');
    }
}

// Test Case 3: Valid Login
async function testValidLogin() {
    console.log('=== TEST CASE 3: TC_LOGIN_001 - Valid Login ===');
    try {
        await driver.get(`${BASE_URL}/login.html`);
        await driver.sleep(2000);
        
        const email = await driver.wait(until.elementLocated(By.id('email')), 5000);
        await email.sendKeys('testuser@example.com');
        
        const password = await driver.wait(until.elementLocated(By.id('password')), 5000);
        await password.sendKeys('Test@1234');
        
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();
        
        await driver.sleep(2000);
        const message = await driver.findElement(By.id('message')).getText();
        
        if (message.includes('successful')) {
            console.log('✓ PASS: Login successful');
            console.log(`  Message: "${message}"`);
        } else {
            console.log('✗ FAIL: Unexpected message:', message);
        }
        
        await driver.sleep(2000);
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('profile.html')) {
            console.log('✓ PASS: Redirected to profile page\n');
        } else {
            console.log('✗ FAIL: Did not redirect to profile\n');
        }
        
    } catch (error) {
        console.log('✗ FAIL: Error -', error.message, '\n');
    }
}

// Test Case 4: Invalid Login
async function testInvalidLogin() {
    console.log('=== TEST CASE 4: TC_LOGIN_002 - Invalid Password Login ===');
    try {
        await driver.get(`${BASE_URL}/login.html`);
        await driver.sleep(2000);
        
        const email = await driver.wait(until.elementLocated(By.id('email')), 5000);
        await email.sendKeys('testuser@example.com');
        
        const password = await driver.wait(until.elementLocated(By.id('password')), 5000);
        await password.sendKeys('WrongPassword');
        
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();
        
        await driver.sleep(2000);
        const message = await driver.findElement(By.id('message')).getText();
        
        if (message.includes('Invalid credentials')) {
            console.log('✓ PASS: Invalid login prevented');
            console.log(`  Message: "${message}"`);
        } else {
            console.log('✗ FAIL: Unexpected message:', message);
        }
        
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl.includes('login.html')) {
            console.log('✓ PASS: Remained on login page\n');
        } else {
            console.log('✗ FAIL: Unexpected redirect\n');
        }
        
    } catch (error) {
        console.log('✗ FAIL: Error -', error.message, '\n');
    }
}

// Test Case 5: View Profile
async function testViewProfile() {
    console.log('=== TEST CASE 5: TC_PROFILE_001 - View Profile (Authenticated) ===');
    try {
        await driver.get(`${BASE_URL}/login.html`);
        await driver.sleep(2000);
        
        const email = await driver.wait(until.elementLocated(By.id('email')), 5000);
        await email.sendKeys('testuser@example.com');
        
        const password = await driver.wait(until.elementLocated(By.id('password')), 5000);
        await password.sendKeys('Test@1234');
        
        const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
        await submitBtn.click();
        
        await driver.sleep(3000);
        
        const username = await driver.findElement(By.id('displayUsername')).getText();
        const emailText = await driver.findElement(By.id('displayEmail')).getText();
        
        if (username === 'testuser123' && emailText === 'testuser@example.com') {
            console.log('✓ PASS: Profile information displayed correctly');
            console.log(`  Username: "${username}"`);
            console.log(`  Email: "${emailText}"`);
        } else {
            console.log('✗ FAIL: Profile information mismatch');
        }
        
        const updateForm = await driver.findElement(By.id('updateForm'));
        const logoutBtn = await driver.findElement(By.id('logoutBtn'));
        const deleteBtn = await driver.findElement(By.id('deleteBtn'));
        
        if (updateForm && logoutBtn && deleteBtn) {
            console.log('✓ PASS: Update form and action buttons visible\n');
        }
        
    } catch (error) {
        console.log('✗ FAIL: Error -', error.message, '\n');
    }
}

async function runAllTests() {
    console.log('\n╔════════════════════════════════════════════╗');
    console.log('║   AUTOMATED TEST EXECUTION - SELENIUM      ║');
    console.log('║   User Registration & Login System         ║');
    console.log('╚════════════════════════════════════════════╝\n');
    
    clearUsers();
    
    driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await testValidRegistration();
        await testDuplicateRegistration();
        await testValidLogin();
        await testInvalidLogin();
        await testViewProfile();
        
        console.log('╔════════════════════════════════════════════╗');
        console.log('║          ALL TESTS COMPLETED               ║');
        console.log('╚════════════════════════════════════════════╝\n');
        
    } catch (error) {
        console.error('Test execution failed:', error);
    } finally {
        await driver.quit();
        console.log('Browser closed.\n');
    }
}

runAllTests();
