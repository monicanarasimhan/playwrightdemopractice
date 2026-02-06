import { Page } from '@playwright/test';

export class WebTablesPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async addRow({ firstName, lastName, email, age, salary, department }: { firstName: string; lastName: string; email: string; age: string; salary: string; department: string; }) {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('name@example.com').fill(email);
    await this.page.getByPlaceholder('Age').fill(age);
    await this.page.getByPlaceholder('Salary').fill(salary);
    await this.page.getByPlaceholder('Department').fill(department);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async editRow(searchText: string, newLastName: string) {
    // use the search box to filter to the target row, then click the Edit button for that row
    await this.search(searchText);
    const row = this.page.getByRole('row').filter({ hasText: searchText }).first();
    await row.getByRole('button', { name: 'Edit' }).click();
    await this.page.getByPlaceholder('Last Name').fill(newLastName);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async search(query: string) {
    await this.page.getByPlaceholder('Type to search').fill(query);
  }

  async editFirstVisibleRow(newLastName: string) {
    // Click the first visible Edit button (after search/filtering)
    const editButton = this.page.getByRole('button', { name: 'Edit' }).first();
    await editButton.waitFor({ state: 'visible' });
    await editButton.click();
    await this.page.getByPlaceholder('Last Name').fill(newLastName);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async editSearchedRow(searchText: string, newLastName: string) {
    // wait for the searched text to appear, then click the Edit button in the same row
    const cell = this.page.getByText(searchText, { exact: true }).first();
    await cell.waitFor({ state: 'visible' });
    const row = cell.locator('..').first();
    // use getByTitle('Edit') scoped to the row if possible
    const editBtn = row.getByTitle('Edit');
    await editBtn.waitFor({ state: 'visible' });
    await editBtn.click();
    await this.page.getByPlaceholder('Last Name').fill(newLastName);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}
