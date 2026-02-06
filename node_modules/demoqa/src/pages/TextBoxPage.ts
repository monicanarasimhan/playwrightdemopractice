import { Page } from '@playwright/test';

export class TextBoxPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async fillAndSubmit({ fullName, email, currentAddress, permanentAddress }: { fullName: string; email: string; currentAddress: string; permanentAddress: string; }) {
    // ensure the form is ready
    await this.page.getByRole('heading', { name: 'Text Box' }).waitFor({ state: 'visible' }).catch(() => {});
    // prefer accessible label, then role-based, then placeholder
    // try exact accessible role locator first as requested
    const fullNameLocators = [
      this.page.getByRole('textbox', { name: 'Full Name' }),
      this.page.getByLabel('Full Name'),
      this.page.getByRole('textbox', { name: /full name|user name|username/i }),
      this.page.getByPlaceholder('Full Name'),
      this.page.getByPlaceholder('Full name')
    ];
    for (const locator of fullNameLocators) {
      try {
        await locator.fill(fullName);
        break;
      } catch (e) {}
    }

    // use requested exact locator for email first
    const emailLocators = [
      this.page.getByRole('textbox', { name: 'name@example.com' }),
      this.page.getByLabel('Email'),
      this.page.getByRole('textbox', { name: /email/i }),
      this.page.getByPlaceholder('name@example.com')
    ];
    for (const locator of emailLocators) {
      try {
        await locator.fill(email);
        break;
      } catch (e) {}
    }

    // use requested locator for Current Address
    const currentLocators = [
      this.page.getByRole('textbox', { name: 'Current Address' }),
      this.page.getByLabel('Current Address'),
      this.page.getByRole('textbox', { name: /current address/i }),
      this.page.getByPlaceholder('Current Address')
    ];
    for (const locator of currentLocators) {
      try {
        await locator.fill(currentAddress);
        break;
      } catch (e) {}
    }

    // use requested locator for Permanent Address (explicit id locator)
    const permanentLocators = [
      this.page.locator('#permanentAddress'),
      this.page.getByLabel('Permanent Address'),
      this.page.getByRole('textbox', { name: /permanent address/i }),
      this.page.getByPlaceholder('Permanent Address')
    ];
    for (const locator of permanentLocators) {
      try {
        await locator.fill(permanentAddress);
        break;
      } catch (e) {}
    }

    const submitBtn = this.page.getByRole('button', { name: 'Submit' });
    await submitBtn.waitFor({ state: 'visible' });
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();
  }

  async isSubmissionShown(fullName: string) {
    // the output shows the submitted name; assert by visible text
    return await this.page.getByText(fullName, { exact: true }).isVisible();
  }
}
