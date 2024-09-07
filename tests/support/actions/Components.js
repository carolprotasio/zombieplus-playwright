const { expect } = require("@playwright/test");

export class Popup {
  constructor(page) {
    this.page = page;
  }
  
  async haveText(msg) {    
    await this.page.waitForTimeout(300);  
    const element = this.page.locator('.swal2-html-container'); 

    await expect(element).toHaveText(msg);  
    
  }

  
};

