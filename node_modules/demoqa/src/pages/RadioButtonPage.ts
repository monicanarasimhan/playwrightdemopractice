import { Page } from '@playwright/test';

export class RadioButtonPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async selectOption(option: 'Yes' | 'Impressive' | 'No') {
    // Click label text for the radio option
    await this.page.getByText(option, { exact: true }).click();
  }

  async isSelectionDisplayed(option: string) {
    return await this.page.getByText(option, { exact: false }).isVisible();
  }
}
