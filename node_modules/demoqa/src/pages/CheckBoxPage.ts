import { Page } from '@playwright/test';

export class CheckBoxPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async toggleHome() {
    // Click the 'Home' toggle by visible text label
    await this.page.getByText('Home', { exact: true }).click();
  }

  async isResultShown(optionText: string) {
    return await this.page.getByText(optionText, { exact: false }).isVisible();
  }
}
