
# Playwright E2E Suite

This monorepo contains Playwright end-to-end test packages for multiple web applications, using the Playwright test runner and the Page Object Model (POM) pattern.

## Monorepo Structure

- **packages/demoqa**: E2E tests for demoqa.com (Practice Form, Elements, Web Tables, Alerts/Frames)
- **packages/flipkart**: E2E tests for Flipkart (placeholder)
- **packages/amazon**: E2E tests for Amazon (placeholder)

Each package contains:
- `src/pages/`: Page Object Models
- `src/tests/`: Test cases
- `src/fixtures/`: (if needed) Test fixtures

## Playwright Configuration

- Root-level `playwright.config.ts` manages all packages and projects (chromium, firefox, webkit)
- Tests use accessible locators: `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`, `getByTitle`
- Headless mode is enabled in CI for reliability

## Running Tests Locally

To run all tests:

```sh
npm install
npx playwright test
```

To run only the demoqa suite:

```sh
npx playwright test packages/demoqa/src/tests/demoqa.spec.ts
```

## Continuous Integration (CI)

GitHub Actions workflow runs the demoqa suite on every push and pull request to `main`:

```yaml
			- name: Run demoqa.spec.ts tests (headless)
				run: npx playwright test packages/demoqa/src/tests/demoqa.spec.ts --reporter=dot --headed=false
```

Check the Actions tab in your GitHub repository to view CI results.
