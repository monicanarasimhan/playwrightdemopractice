import { Page, Locator } from '@playwright/test';

export class PracticeFormPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly genderMaleLabel: Locator;
  readonly genderFemaleLabel: Locator;
  readonly genderOtherLabel: Locator;
  readonly dobInput: Locator;
  readonly hobbiesSports: Locator;
  readonly hobbiesReading: Locator;
  readonly hobbiesMusic: Locator;
  readonly currentAddress: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly mobile: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.genderMaleLabel = page.locator('label[for="gender-radio-1"]');
    this.genderFemaleLabel = page.locator('label[for="gender-radio-2"]');
    this.genderOtherLabel = page.locator('label[for="gender-radio-3"]');
    this.dobInput = page.locator('#dateOfBirthInput');
    this.hobbiesSports = page.locator('label[for="hobbies-checkbox-1"]');
    this.hobbiesReading = page.locator('label[for="hobbies-checkbox-2"]');
    this.hobbiesMusic = page.locator('label[for="hobbies-checkbox-3"]');
    this.currentAddress = page.locator('#currentAddress');
    this.stateDropdown = page.getByText('Select State', { exact: true });
    this.cityDropdown = page.getByText('Select City', { exact: true });
    this.mobile = page.locator('#userNumber');
    this.submitButton = page.locator('#submit');
    this.successMessage = page.locator('#example-modal-sizes-title-lg');
  }

  async fillForm({
    firstName,
    lastName,
    email,
    gender = 'Male',
    dob,
    hobbies = [],
    mobile,
    currentAddress,
    state,
    city
  }: {
    firstName: string;
    lastName: string;
    email: string;
    gender?: 'Male' | 'Female' | 'Other';
    dob?: string;
    hobbies?: string[];
    mobile: string;
    currentAddress?: string;
    state?: string;
    city?: string;
  }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    if (gender === 'Male') await this.genderMaleLabel.click();
    else if (gender === 'Female') await this.genderFemaleLabel.click();
    else if (gender === 'Other') await this.genderOtherLabel.click();
    if (dob) await this.dobInput.fill(dob);
    await this.mobile.fill(mobile);
    if (hobbies.includes('Sports')) {
      await this.hobbiesSports.scrollIntoViewIfNeeded();
      await this.hobbiesSports.click();
    }
    if (hobbies.includes('Reading')) {
      await this.hobbiesReading.scrollIntoViewIfNeeded();
      await this.hobbiesReading.click();
    }
    if (hobbies.includes('Music')) {
      await this.hobbiesMusic.scrollIntoViewIfNeeded();
      await this.hobbiesMusic.click();
    }
    if (currentAddress) await this.currentAddress.fill(currentAddress);
    if (state) {
      await this.page.getByText('Select State', { exact: true }).click();
      await this.page.getByText('NCR', { exact: true }).click();
    }
    if (city) {
      await this.page.getByText('Select City', { exact: true }).click();
      await this.page.getByText('Noida', { exact: true }).click();
    }
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async isSubmissionSuccessful() {
    return await this.successMessage.isVisible();
  }
}
