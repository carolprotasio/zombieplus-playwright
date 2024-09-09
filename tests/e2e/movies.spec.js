
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
test("CT_002 Deve poder remover um filme", async ({ page, request }) => {
  const movie = data.to_remove;
  await request.api.postMovie(movie);  

  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin"); 
  await page.movies.remove(movie.title)

  await page.popup.haveText('Filme removido com sucesso.');
  
});
test("CT_003 NÃO deve cadastrar quando o título é duplicado", async ({ page, request}) => {
  const movie = data.duplicate    
  
  await request.api.postMovie(movie)
  
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin"); 
  await page.movies.create(movie);
  await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`); 
});
test("CT_004 NÃO deve cadastrar quando os campos obrigatorios não são preenchidos", async ({ page}) => {

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

test('CT-005 Deve realizar buscar pelo termo zumbi ', async ( { page, request }) => {
  const movies = data.search

  movies.data.forEach(async (m) => {
    await request.api.postMovie(m);
  })
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");  
  await page.movies.search(movies.input)
  await page.movies.tableHave(movies.outputs)
})
test('CT-006 Deve realizar buscar por todos os filmes', async ( { page, request }) => {
  const movies = data.search
  const movie = data.guerra_mundial_z 

  movies.data.forEach(async (m) => {
    await request.api.postMovie(m);
  })
  await request.api.postMovie(movie);
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");  
  await page.click('.actions button');
  await page.movies.tableHave(movies.outputs, movie.title);
})

