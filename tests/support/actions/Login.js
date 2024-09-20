// @ts-check
const { expect } = require("@playwright/test");

export class Login {
  constructor(page) {
    this.page = page;
  }

  async doALogin(email, password, user) {
    await this.visit();
    await this.loginForm(email, password);
    await this.isLoggedIn(user);
  }

  async visit() {
    await this.page.goto("/admin/login");

    const loginForm = this.page.locator(".login-form");
    await expect(loginForm).toBeVisible();
  }
  async isLoggedIn(user) {
    const loggedUser = this.page.locator(".logged-user");
    await expect(loggedUser).toHaveText(`Olá, ${user}`);
  }

  async loginForm(email, password) {
    await this.page.getByPlaceholder("E-mail").fill(email);
    await this.page.getByPlaceholder("Senha").fill(password);

    await this.page.getByText("Entrar").click();
    //await this.page.waitForTimeout(300);
  }

  async alertHasText(text) {
    await this.page.waitForTimeout(300);
    const alert = this.page.locator('span[class$="alert"]');
    await expect(alert).toHaveText(text);
  }
}
