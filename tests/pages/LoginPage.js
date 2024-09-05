// @ts-check
const { expect } = require('@playwright/test');

export class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async visit(){
        await this.page.goto('http://localhost:3000/admin/login');

        const loginForm = this.page.locator('.login-form');
        await expect(loginForm).toBeVisible(); 
    }

    async loginForm(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);

        await this.page.getByText('Entrar').click();
        //await this.page.waitForTimeout(300);        
    }

    async alertHasText(text) {
        await this.page.waitForTimeout(300);
        const alert = this.page.locator('span[class$="alert"]');
        await expect(alert).toHaveText(text);  
    } 
    
  
}