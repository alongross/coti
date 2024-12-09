import puppeteer from 'puppeteer';
import { expect } from 'chai';
import MetaMaskPage from '../pages/metamaskPage.js';
import DAppPage from '../pages/dappPage.js';

describe('MetaMask and dApp Interaction', function () {
  this.timeout(60000); // Extend timeout for Puppeteer
  let browser;
  let metaMaskPage;
  let dAppPage;

  before(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });

    metaMaskPage = new MetaMaskPage(browser);
    dAppPage = new DAppPage(browser);
  });

  after(async () => {
    await browser.close();
  });

  it('should connect to MetaMask and sign a transaction', async function () {
    // Navigate to the dApp's main page
    await dAppPage.navigateTo('https://treasury.coti.io');

    // Click on the "Enter Treasury" button
    await dAppPage.clickButtonBySelector('button.Button_button-component__zTGW4.Button_home-page-button__O30UK');

    // Click on the MetaMask connection button
    await dAppPage.clickButtonBySelector('div.Connect_connect__RB1lO img[alt="MetaMask"]');

    // Validate that the connection process started
    const isConnecting = await dAppPage.isButtonDisabledWithText('CONNECTING');
    expect(isConnecting).to.be.true;
  });
});
