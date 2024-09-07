
const { test, request, expect } = require("../support/index");
const data = require("../support/fixtures/movies.json");
const { executeSql } = require("../support/database");

test.beforeAll(async ()=> {
  await executeSql('DELETE FROM movies'); 
});

test("CT_001 Deve poder cadastrar um novo filme", async ({ page}) => {
  const movie = data.guerra_mundial_z 
  
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");  

  await page.movies.create(movie);
  await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`); 
});
test("CT_002 NÃO deve cadastrar quando o título é duplicado", async ({ page, request}) => {
  const movie = data.duplicate    
  
  await request.api.postMovie(movie)
  
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin"); 
  await page.movies.create(movie);
  await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`); 
});
test("CT_00x NÃO deve cadastrar quando os campos obrigatorios não são preenchidos", async ({ page}) => {

  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin"); 

  await page.movies.goForm();
  await page.movies.submit();

  await page.movies.alertHaveText([    
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
