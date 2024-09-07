const { test } = require("../support/index");

test("CT-001 Deve realizar o login como administrador", async ({ page }) => {
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");  
  
});
test("CT-002 Não deve logar com senha incorreta", async ({ page }) => {
  await page.login.visit();
  await page.login.loginForm("admin@zombieplus.com", "senhaIncorreta");

  const msg =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
  await page.toast.containText(msg);
});
test("CT-003 Não deve logar com formatação do email incorreta", async ({
  page,
}) => {
  await page.login.visit();
  await page.login.loginForm("admin.zombieplus.com", "pwd123");
  await page.login.alertHasText("Email incorreto");
});
test("CT-004 Não deve logar se for email diferente do ADM", async ({
  page,
}) => {
  await page.login.visit();
  await page.login.loginForm("diferenteEmail@zombieplus.com", "pwd123");

  const msg =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
  await page.toast.containText(msg);
});
test("CT-005 Não deve logar se email não for preenchido", async ({ page }) => {
  await page.login.visit();
  await page.login.loginForm("", "pwd123");
  await page.login.alertHasText("Campo obrigatório");
});
test("CT-006 Não deve logar se senha não for preenchida", async ({ page }) => {
  await page.login.visit();
  await page.login.loginForm("admin@zombieplus.com", "");

  await page.login.alertHasText("Campo obrigatório");
});
test("CT-007 Não deve logar se email e senha não foram preenchida", async ({
  page,
}) => {
  await page.login.visit();
  await page.login.loginForm("", "");
  await page.login.alertHasText(["Campo obrigatório", "Campo obrigatório"]);
});
