const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    await page.goto("https://localhost:8443/cas/login");

    await page.type('#username', "disabled");
    await page.type('#password', "disabled");
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    
    const header = await page.$eval('#content h2', el => el.innerText)
    console.log(header)
    assert(header === "This account has been disabled.")
    
    await browser.close();
})();
