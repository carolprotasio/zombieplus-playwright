// @ts-check
const { expect } = require("@playwright/test");

export class TvShows {
	constructor(page) {
		this.page = page;
	}

	async goToTvShows() {
		await this.page.getByRole("link", { name: "Séries de TV" }).click();

		const content = await this.page.getByRole("heading", {
			name: "Séries de TV",
		});
		await expect(content).toContainText("Séries de TV");
	}
	async goForm() {
		await this.page.locator('a[href$="register"]').click();
		await this.page.waitForTimeout(1000);
	}

	async submit() {
		await this.page.getByRole("button", { name: "Cadastrar" }).click();
	}

	async createTvShow(tvshow) {
		await this.goToTvShows();
		await this.goForm();

		await this.page.locator("#title").fill(tvshow.title);
		await this.page.locator("#overview").fill(tvshow.overview);

		await this.page
			.locator("#select_company_id .react-select__indicators")
			.click();
		await this.page
			.locator(".react-select__option")
			.filter({ hasText: tvshow.company })
			.click();

		await this.page.locator("#select_year .react-select__indicator").click();
		await this.page
			.locator(".react-select__option")
			.filter({ hasText: tvshow.release_year })
			.click();

		await this.page
			.locator('input[id="seasons"]')
			.fill(tvshow.season.toString());

		await this.page
			.locator("input[name=cover]")
			.setInputFiles("tests/support/fixtures" + tvshow.cover);

		if (tvshow.featured) {
			await this.page.locator(".featured .react-switch").click();
		}
		await this.submit();
	}
	async alertHaveText(target) {
		await expect(this.page.locator(".alert")).toHaveText(target);
	}

	async search(target) {
		//await this.goToTvShows()
		await this.page.getByPlaceholder("Busque pelo nome").fill(target);
		await this.page.click(".actions button");
	}

	async tableHave(content) {
		const rows = await this.page.getByRole("row");		   
		await expect(rows).toContainText(content);
	}
}
