// @ts-check
const { expect } = require("@playwright/test");

export class Movies {
	constructor(page) {
		this.page = page;
	}

	async goForm() {
		await this.page.locator('a[href$="register"]').click();
	}
	async submit() {
		await this.page.getByRole("button", { name: "Cadastrar" }).click();
	}

	async create(movie) {
		await this.goForm();

		await this.page.getByLabel("Titulo do filme").fill(movie.title);
		await this.page.locator("#overview").fill(movie.overview);

		await this.page
			.locator("#select_company_id .react-select__indicator")
			.click();

		await this.page
			.locator(".react-select__option")
			.filter({ hasText: movie.company })
			.click();

		await this.page.locator("#select_year .react-select__indicator").click();

		await this.page
			.locator(".react-select__option")
			.filter({ hasText: movie.release_year })
			.click();

		await this.page
			.locator("input[name=cover]")
			.setInputFiles(`tests/support/fixtures${movie.cover}`);

		if (movie.featured) {
			await this.page.locator(".featured .react-switch").click();
		}
		await this.submit();
	}

	async search(target) {
		await this.page.getByPlaceholder("Busque pelo nome").fill(target);
		await this.page.click(".actions button");
	}
/* 	async tableHave(content) {
		const rows = await this.page.getByRole('rows');
		await expect(rows).toContainText(content);
	} */

		async tableHave(content) {
			const rows = await this.page.getByRole("row");
		
			for (let i = 0; i < rows.length; i++) {
			  const rowText = await rows[i].textContent();
			  const title = rowText.split(/(\d+ Temporadas)/)[0].trim();
			  await expect(title).toBe(content[i]);
			}
		  }
		


	async alertHaveText(target) {
		await expect(this.page.locator(".alert")).toHaveText(target);
	}

	async remove(title) {
		await this.page.waitForTimeout(300);
		await this.page
			.getByRole("row", { name: title })
			.getByRole("button")
			.click();
		await this.page.click(".confirm-removal");
	}
}
