const { expect } = require("@playwright/test");

export class Toast {
  constructor(page) {
    this.page = page;
  }
  
  async containText(msg) {    
    await this.page.waitForTimeout(300);  
    const toast = this.page.locator('.toast'); 

    await expect(toast).toContainText(msg);  
    //await expect(toast).not.toBeVisible({ timeout: 5000 });
  }
};

