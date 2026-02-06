
module.exports = defineConfig({
  testDir: './packages',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        slowMo: 2000,
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        slowMo: 2000,
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        headless: false,
        slowMo: 2000,
      },
    },
  ],
});