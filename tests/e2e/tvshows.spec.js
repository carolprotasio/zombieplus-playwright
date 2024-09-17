const { test, request, expect } = require("../support/index");
const data = require("../support/fixtures/tvshows.json");
const { executeSql } = require("../support/database");

test.beforeEach(async () => {
  await executeSql("DELETE FROM tvshows");
}); 

test("CT-001 Deve cadastrar nava serie de tv", async ({ page }) => {
  const serie = data.create;
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvShow.goToTvShows();
  await page.tvShow.createTvShow(serie);
  await page.popup.haveText(
    `A série '${serie.title}' foi adicionada ao catálogo.`
  );
});
test("CT_002 Deve poder remover uma serie", async ({ page, request }) => {
  const serie = data.to_remove;
  await request.api.postTvShow(serie);
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvShow.goToTvShows();
  await page.movies.remove(serie.title);

  await page.popup.haveText("Série removida com sucesso.");
});
test("CT-003 Não permitir o cadastro de séries com títulos já existentes.", async ({  page,  request,}) => {
  const serie = data.duplicate;

  await request.api.postTvShow(serie);
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvShow.createTvShow(serie);
  await page.waitForTimeout(1000);
  await page.popup.haveText(
    `O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  );
});
test("CT-004 Deve realizar buscar pelo termo zumbi ", async ({  page,  request,}) => {
  const serie = data.search;
  
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");
  await page.waitForTimeout(1000)

  serie.data.forEach(async (s) => {
    //await executeSql(`DELETE FROM tvshows WHERE title = '${s.title}`);
    await request.api.postTvShow(s);
  });
  
  await page.tvShow.goToTvShows();
  await page.tvShow.search(serie.input);
  await page.tvShow.tableHave(serie.outputs);
});
test("CT-005 NÃO deve cadastrar quando os campos obrigatorios não são preenchidos", async ({
  page,
}) => {
  await page.login.doALogin("admin@zombieplus.com", "pwd123", "Admin");
  await page.tvShow.goToTvShows();
  await page.tvShow.goForm();
  await page.tvShow.submit();
  await page.tvShow.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório (apenas números)",
  ]);
});

test.afterAll(async () => {
  await executeSql("DELETE FROM tvshows");
});
