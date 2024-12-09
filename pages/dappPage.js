class DAppPage {
    constructor(browser) {
      this.browser = browser;
      this.page = null;
    }
  
    async navigateTo(url) {
      this.page = await this.browser.newPage();
      await this.page.goto(url, { waitUntil: 'networkidle2' });
    }
  
    async clickButtonBySelector(selector) {
      const button = await this.page.waitForSelector(selector, { visible: true });
      if (!button) throw new Error(`Button with selector "${selector}" not found`);
      await button.click();
    }
  
    async isButtonDisabledWithText(text) {
      const button = await this.page.$x(`//button[contains(text(), '${text}')]`);
      if (button.length === 0) throw new Error(`Button with text "${text}" not found`);
      const isDisabled = await this.page.evaluate(btn => btn.disabled, button[0]);
      return isDisabled;
    }
  }
  
  export default DAppPage;
  