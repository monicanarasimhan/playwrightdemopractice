import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { ElementsPage } from '../pages/ElementsPage';
import { TextBoxPage } from '../pages/TextBoxPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { AlertsFramesPage } from '../pages/AlertsFramesPage';

const BASE_URL = 'https://demoqa.com/';

test.describe('DemoQA combined suite', () => {
  test('Practice Form submission should be successful', async ({ page }) => {
    await page.goto(BASE_URL);

    // Wait for 'Forms' text to be visible, then click
    await page.getByText('Forms', { exact: true }).waitFor({ state: 'visible' });
    await page.getByText('Forms', { exact: true }).click();

    // Wait for Forms page to load
    await page.waitForURL(/.*forms.*/);

    // Select Practice Form
    await page.getByText('Practice Form', { exact: true }).click();

    // Wait for Practice Form page to load
    await page.waitForURL(/.*automation-practice-form.*/);
    await page.waitForSelector('input[id="firstName"]');

    // Fill the form details
    const formPage = new PracticeFormPage(page);
    await formPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      dob: '01 Jan 1990',
      hobbies: ['Sports', 'Reading'],
      mobile: '1234567890',
      currentAddress: '123 Main St, City',
      state: 'NCR',
      city: 'Delhi',
    });

    // Submit the form
    await formPage.submitForm();

    // Assert successful submission
    await expect(formPage.successMessage).toBeVisible();
  });

  test('Element validation', async ({ page }) => {
    await page.goto(BASE_URL);
    const elements = new ElementsPage(page);

    await page.getByText('Elements', { exact: true }).waitFor({ state: 'visible' });
    await page.getByText('Elements', { exact: true }).click();
    await page.waitForURL(/.*elements.*/);

    // Text Box
    await elements.goToTextBox();
    await page.waitForURL(/.*text-box.*/);
    const textBox = new TextBoxPage(page);
    const fullName = 'Alice Wonderland';
    // wait for the Text Box page heading to ensure the form is ready
    await page.getByRole('heading', { name: 'Text Box' }).waitFor({ state: 'visible' });
    await textBox.fillAndSubmit({ fullName, email: 'alice@example.com', currentAddress: '123 A St', permanentAddress: '456 B St' });

    // Check Box
    await elements.goToCheckBox();
    await page.waitForURL(/.*checkbox.*/);
    const checkBox = new CheckBoxPage(page);
    await checkBox.toggleHome();
    await page.getByLabel('Home');

    // Radio Button
    await elements.goToRadioButton();
    await page.waitForURL(/.*radio-button.*/);
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
    // edit the row we just added
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
    await page.getByText('Alerts, Frame & Windows', { exact: false }).click();
    await page.waitForURL(/.*alerts.*/);
    await elements.goToAlertsFramesWindows();
    const alertsFrames = new AlertsFramesPage(page);

    // Alerts
    await page.getByText('Alerts', { exact: true }).click();
    await page.waitForURL(/.*alerts.*/);
    const saw = await alertsFrames.triggerAlertAndAccept();
    expect(saw).toBeTruthy();

    // Frames
    await page.getByText('Frames', { exact: true }).click();
    await page.waitForURL(/.*frames.*/);
    const framesContent = await alertsFrames.checkFramesContent();
    expect(framesContent.length).toBeGreaterThan(0);
  });
});
