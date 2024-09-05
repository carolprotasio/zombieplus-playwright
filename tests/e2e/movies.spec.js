
const { test } = require("../support/index");
const data = require("../support/fixtures/movies.json");
const { executeSql } = require("../support/database");

test("deve poder cadastrar um novo filme", async ({ page}) => {

  const movie = data.the_witcher; //nome do filme
  await executeSql(`DELETE FROM public.movies WHERE title = '${movie.title}';`);  

  await page.login.visit();
  await page.login.loginForm("admin@zombieplus.com", "pwd123");
  await page.movies.isLoggedIn();

  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year
  );

  await page.toast.containText("Cadastro realizado com sucesso!"); 
});
