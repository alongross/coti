import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { expect } from 'chai';
import MetaMaskPage from '../pages/metamaskPage.js';
import DAppPage from '../pages/dappPage.js';

// Enable Stealth Plugin
puppeteer.use(StealthPlugin());

describe('MetaMask and dApp Interaction', function () {
  this.timeout(60000); // Extend timeout for Puppeteer
  let browser;
  let page;
  let metaMaskPage;
  let dAppPage;

  before(async () => {
    // Launch Puppeteer with Stealth Plugin
    browser = await puppeteer.launch({
      headless: false, // Ensure non-headless for visibility
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
      ],
    });

    // Create a new page and set extra HTTP headers
    page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    });

    // Initialize Page Objects
    metaMaskPage = new MetaMaskPage(browser);
    dAppPage = new DAppPage(browser, page);
  });

  after(async () => {
    await browser.close();
  });

  it('should connect to MetaMask and sign a transaction', async function () {
    // Navigate to the dApp's main page
    await dAppPage.navigateTo('https://treasury.coti.io');

    // Simulate user clicking the "Enter Treasury" button
    await dAppPage.clickButtonBySelector(
      'button.Button_button-component__zTGW4.Button_home-page-button__O30UK'
    );

    // Simulate user clicking the MetaMask connection button
    await dAppPage.clickButtonBySelector(
      'div.Connect_connect__RB1lO img[alt="MetaMask"]'
    );

    // Validate that the connection process started
    const isConnecting = await dAppPage.isButtonDisabledWithText('CONNECTING');
    expect(isConnecting).to.be.true;

    // Add random delay to mimic user interaction
    await dAppPage.delayRandom();

    console.log('Test completed successfully!');
  });
});
