// Interactions with MetaMask
class MetaMaskPage {
    constructor(browser) {
      this.browser = browser;
      this.page = null;
    }
  
    async loadExtension(extensionPath) {
      this.page = await this.browser.newPage();
      const extensionUrl = `chrome-extension://${extensionPath}/home.html`;
      await this.page.goto(extensionUrl);
    }
  
    async connectWallet() {
      await this.page.bringToFront();
      await this.page.click('button:contains("Next")'); // Adjust the selector
      await this.page.click('button:contains("Connect")'); // Adjust the selector
    }
  
    async signTransaction() {
      await this.page.bringToFront();
      await this.page.click('button:contains("Confirm")'); // Adjust the selector
    }
  }
  
  module.exports = MetaMaskPage;
  