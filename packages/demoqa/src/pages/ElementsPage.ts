import { Page } from '@playwright/test';

export class ElementsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goToTextBox() {
    await this.page.getByText('Text Box', { exact: true }).click();
  }

  async goToCheckBox() {
    await this.page.getByText('Check Box', { exact: true }).click();
  }

  async goToRadioButton() {
    await this.page.getByText('Radio Button', { exact: true }).click();
  }

  async goToWebTables() {
    await this.page.getByText('Web Tables', { exact: true }).click();
  }

  async goToAlertsFramesWindows() {
    await this.page.getByText('Alerts, Frame & Windows', { exact: false }).click();
  }
}
