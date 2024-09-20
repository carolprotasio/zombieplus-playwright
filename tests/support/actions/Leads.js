const { expect } = require('@playwright/test');

export class Leads {

    constructor(page){
        this.page = page;
    }

    async visit(){
        await this.page.goto('/');
    }
    async openModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();
        await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera');  
    }
    async submitLeadForm(name, email) {
        await this.page.locator('#name').fill(name);
        await this.page.locator('#email').fill(email); 

        await this.page.getByTestId('modal').getByText('Quero entrar na fila').click();
        await this.page.waitForTimeout(3000);
    }
    
    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);  
    }  


}