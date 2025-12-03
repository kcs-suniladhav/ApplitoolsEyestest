[![CI](https://github.com/kcs-suniladhav/ApplitoolsEyestest/actions/workflows/ci.yml/badge.svg)](https://github.com/kcs-suniladhav/ApplitoolsEyestest/actions/workflows/ci.yml)
# Cypress + Applitools Eyes Visual Testing Setup

# Cypress + Applitools Eyes Visual Testing Setup

This project integrates **Cypress** with **Applitools Eyes** for automated visual testing of the Visual Comfort website designer page.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Applitools API Key (free account at https://applitools.com)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Applitools API Key

Set your Applitools API key as an environment variable:

**Windows PowerShell:**
```powershell
$env:APPLITOOLS_API_KEY = "your_api_key_here"
```

**Windows Command Prompt:**
```cmd
set APPLITOOLS_API_KEY=your_api_key_here
```

**macOS/Linux:**
```bash
export APPLITOOLS_API_KEY=your_api_key_here
```

**Or create a `.env` file** (for local development):
```
APPLITOOLS_API_KEY=your_api_key_here
```

### 3. Get Your Applitools API Key

1. Go to https://applitools.com and sign up for a free account
2. Navigate to your account settings
3. Copy your API Key
4. Set it as shown in step 2 above

## 🧪 Running Tests

### Open Cypress Interactive Mode
```bash
npm run test:open
```

### Run Tests in Headless Mode
```bash
npm run test
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

## 🏠 Home Page Visual Testing

A comprehensive test suite for the Visual Comfort home page is included. These tests validate visual rendering, image integrity, layout alignment, and provide baseline snapshots for visual regression testing.

### Home Page Test Suite (`cypress/e2e/home-page-visual.cy.js`)

The home page tests include:

1. **Initial Page Load** - Verifies home page loads successfully with HTTP 200 status.
2. **Image Integrity** - Validates all visible images are properly loaded with correct dimensions.
3. **Hero Section Validation** - Checks hero banner/section is visible and properly aligned.
4. **Product Grid Alignment** - Verifies products/featured items are in grid layout with consistent heights.
5. **Baseline Capture** - Captures full page baseline for visual regression testing.
6. **Visual Comparison** - Compares current snapshot with baseline (allows 25% mismatch for dynamic content).
7. **Responsive Layout** - Validates header, footer, and navigation are properly rendered.

### Run Home Page Tests

```bash
# Run all home page tests
npx cypress run --spec "cypress/e2e/home-page-visual.cy.js"

# Run with interactive mode
npx cypress open
```

### Home Page Screenshots & Baselines

Tests generate 8 screenshots for analysis:
- `home-01-initial-load.png` - Initial page load
- `home-02-images-loaded-scroll.png` - Page after scrolling (images loaded)
- `home-03-hero-section.png` - Hero section focus
- `home-04-grid-alignment.png` - Product grid alignment
- `home-05-baseline.png` - Baseline snapshot (used for regression)
- `home-06-full-page-snapshot.png` - Full page snapshot
- `home-07-current-snapshot.png` - Current run snapshot (for comparison)
- `home-08-responsive-layout.png` - Responsive layout validation

**Baseline Location:** `cypress/screenshots/home-page-visual.cy.js/home-05-baseline.png`

When the baseline snapshot exists, subsequent runs will automatically compare against it and report mismatch percentage in the logs.

## Applitools Eyes (optional)

This project is already configured with Applitools Eyes using the `@applitools/eyes-cypress` plugin. The bundler has been configured with polyfills and aliases to handle Node built-ins (like `stream`). To enable dashboard uploads and see results on Applitools:

1. **Create Applitools Account** (if not already done)
  - Go to https://applitools.com and sign up for a free account.
  - Copy your API Key from account settings.

2. **Add GitHub Secret** (for CI/GitHub Actions)
  - Go to your GitHub repo → Settings → Secrets and variables → Actions.
  - Click "New repository secret".
  - Name: `APPLITOOLS_API_KEY`
  - Value: Your Applitools API key (paste from step 1).
  - Save.

3. **Set Local Environment (Optional, for local runs)**
  - Set the environment variable before running tests:

  **Windows PowerShell:**
  ```powershell
  $env:APPLITOOLS_API_KEY = "your_api_key_here"
  npx cypress run
  ```
   
  **macOS/Linux:**
  ```bash
  export APPLITOOLS_API_KEY="your_api_key_here"
  npx cypress run
  ```

4. **Run Tests and View Results**
  - Run tests locally: `npm test` or `npm run test:open`.
  - Visual checkpoints are now sent to Applitools dashboard when the API key is set.
  - View results at https://applitools.com → Test Results.
  - CI runs (GitHub Actions) will also upload results when the secret is configured.

**Current Setup:**
- `@applitools/eyes-cypress` is installed and ready to use.
- Plugin is registered in `cypress.config.js` with defensive error handling.
- Eyes commands (`cy.eyesOpen`, `cy.eyesCheckWindow`, `cy.eyesClose`) are imported in `cypress/support/e2e.js`.
- Bundler (esbuild) is configured with polyfills (`stream-browserify`) and aliases so Node built-ins don't cause build errors.
- Tests already contain `cy.eyesCheckWindow()` calls to capture visual checkpoints.

### Run Tests with Chrome Browser
```bash
npm run test:chrome
```

## 📁 Project Structure

```
cypress/
├── e2e/
│   └── visual-test.cy.js          # Main visual test suite
├── support/
│   ├── e2e.js                     # Support file (imports Eyes)
│   └── commands.js                # Custom Cypress commands
├── fixtures/                       # Test data (optional)
└── downloads/                      # Downloaded files during tests
cypress.config.js                  # Cypress configuration
package.json                       # Dependencies
README.md                          # This file
```

## 🎯 Test Coverage

The test suite (`visual-test.cy.js`) performs the following visual tests:

1. **Full Page Load** - Captures the complete page when first loaded
2. **Designer Info Section** - Captures the designer information area
3. **Page After Scroll** - Captures the page after scrolling to the bottom

## 🔧 How It Works

1. **Baseline Creation**: On first run, Eyes creates visual baselines for each test
2. **Comparison**: On subsequent runs, Eyes compares current screenshots to baselines
3. **Results**: Access results at https://applitools.com under "Test Results"

## 📊 Viewing Results

After running tests:
1. Go to https://applitools.com
2. Log in with your account
3. Navigate to the test results
4. Review any visual differences detected

## 🛠️ Customization

### Add More Visual Checkpoints

Edit `cypress/e2e/visual-test.cy.js` to add more `cy.eyesCheckWindow()` calls:

```javascript
it('should capture specific element', () => {
  cy.visit('/us/c/our-designers/anne-marie-barton');
  
  // Capture specific element
  cy.eyesCheckWindow({
    tag: 'Element Name',
    target: 'element',
    selector: '.element-class'
  });
});
```

### Modify Viewport Size

Edit `cypress.config.js`:

```javascript
viewportWidth: 1920,
viewportHeight: 1080,
```

## 🐛 Troubleshooting

### Tests fail with "API key not found"
- Ensure `APPLITOOLS_API_KEY` environment variable is set
- Restart your terminal/IDE after setting the variable

### Tests time out
- Increase `defaultCommandTimeout` in `cypress.config.js`
- Check your internet connection

### Visual differences not detected
- Ensure you're running on the same machine/browser
- Check for any network-related rendering differences

## 📚 Useful Links

- [Cypress Documentation](https://docs.cypress.io/)
- [Applitools Eyes Documentation](https://applitools.com/docs)
- [Applitools Eyes Cypress Plugin](https://github.com/applitools/eyes.cypress)

## 📝 License

ISC

---

**Ready to go!** Run `npm install` and then `npm run test:open` to start visual testing.
