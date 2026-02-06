import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';

const BASE_URL = 'https://demoqa.com/';

test('Practice Form submission should be successful', async ({ page }) => {
  // Navigate to URL
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
