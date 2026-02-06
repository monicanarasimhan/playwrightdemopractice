import { Page, Dialog, Frame } from '@playwright/test';

export class AlertsFramesPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async triggerAlertAndAccept() {
    let seen = false;
    const handler = (dialog: Dialog) => {
      seen = true;
      dialog.accept();
    };
    this.page.on('dialog', handler);
    await this.page.getByText('Click me', { exact: false }).first().click();
    // small wait for dialog handling
    await this.page.waitForTimeout(500);
    this.page.off('dialog', handler);
    return seen;
  }

  async checkFramesContent() {
    const frames = this.page.frames();
    const contents: string[] = [];
    // skip main frame (index 0), iterate subsequent frames
    for (let i = 1; i < frames.length; i++) {
      const f = frames[i];
      // attempt to find any visible text in frame
      try {
        const text = await f.locator('body').innerText();
        contents.push(text.slice(0, 100));
      } catch (e) {
        contents.push('');
      }
    }
    return contents;
  }
}
