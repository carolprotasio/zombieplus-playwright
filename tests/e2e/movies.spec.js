
const { test } = require("../support/index");
const data = require("../support/fixtures/movies.json");
const { executeSql } = require("../support/database");

test.beforeAll(async ()=> {
  await executeSql('DELETE FROM movies'); 
});

test("CT_001 Deve poder cadastrar um novo filme", async ({ page}) => {
  const movie = data.guerra_mundial_z 
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");  

  await page.movies.create(movie);
  await page.toast.containText("Cadastro realizado com sucesso!"); 
});
test("CT_002 NÃO deve cadastrar quando o título é duplicado", async ({ page}) => {
  const movie = data.duplicate   
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin"); 
  await page.movies.create(movie);
  await page.toast.containText("Cadastro realizado com sucesso!"); 

  //await page.waitForTimeout(3000);
  await page.movies.create(movie);
  await page.toast.containText("Oops!Este conteúdo já encontra-se cadastrado no catálogo"); 
});
test("CT_00x NÃO deve cadastrar quando os campos obrigatorios não são preenchidos", async ({ page}) => {

  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin"); 

  await page.movies.goForm();
  await page.movies.submit();

  await page.movies.alertHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])
});
