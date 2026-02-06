import { test, expect } from '@playwright/test';
import { ElementsPage } from '../pages/ElementsPage';
import { TextBoxPage } from '../pages/TextBoxPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { AlertsFramesPage } from '../pages/AlertsFramesPage';

const BASE_URL = 'https://demoqa.com/';

test.describe.serial('Elements and Components validations', () => {
  test('Element validation', async ({ page }) => {
    await page.goto(BASE_URL);
    const elements = new ElementsPage(page);

    await page.getByText('Elements', { exact: true }).waitFor({ state: 'visible' });
    await page.getByText('Elements', { exact: true }).click();

    // Text Box
    await elements.goToTextBox();
    const textBox = new TextBoxPage(page);
    const fullName = 'Alice Wonderland';
    // wait for the Text Box page heading to ensure the form is ready
    await page.getByRole('heading', { name: 'Text Box' }).waitFor({ state: 'visible' });
    await textBox.fillAndSubmit({ fullName, email: 'alice@example.com', currentAddress: '123 A St', permanentAddress: '456 B St' });

    // Check Box
    await elements.goToCheckBox();
    const checkBox = new CheckBoxPage(page);
    await checkBox.toggleHome();
    await page.getByLabel('Home');

    // Radio Button
    await elements.goToRadioButton();
    const radio = new RadioButtonPage(page);
    await radio.selectOption('Yes');
    await expect(page.getByText('You have selected', { exact: false })).toBeVisible();
  });

  test('Web tables validation', async ({ page }) => {
    await page.goto(BASE_URL);
    const elements = new ElementsPage(page);
    await page.getByText('Elements', { exact: true }).click();
    await elements.goToWebTables();
    const webTables = new WebTablesPage(page);
    await webTables.addRow({ firstName: 'Bob', lastName: 'Builder', email: 'bob@builder.com', age: '30', salary: '1000', department: 'Construction' });
    // search the row and edit the first visible result
    await webTables.search('Bob');
    await webTables.editSearchedRow('Bob', 'Fixer');
    // search for the updated row
    await webTables.search('Fixer');
    await expect(page.getByText('Fixer', { exact: true })).toBeVisible();
  });

  test('Alerts and frames validation', async ({ page }) => {
    await page.goto(BASE_URL);
    const elements = new ElementsPage(page);
    await page.getByText('Alerts, Frame & Windows', { exact: false }).waitFor({ state: 'visible' });
    await elements.goToAlertsFramesWindows();
    const alertsFrames = new AlertsFramesPage(page);

    // Alerts
    await page.getByText('Alerts', { exact: true }).click();
    const saw = await alertsFrames.triggerAlertAndAccept();
    expect(saw).toBeTruthy();

    // Frames
    await page.getByText('Frames', { exact: true }).click();
    const framesContent = await alertsFrames.checkFramesContent();
    expect(framesContent.length).toBeGreaterThan(0);
  });
});
