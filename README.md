[![CI](https://github.com/kcs-suniladhav/ApplitoolsEyestest/actions/workflows/ci.yml/badge.svg)](https://github.com/kcs-suniladhav/ApplitoolsEyestest/actions/workflows/ci.yml)

# Cypress + Applitools Eyes Visual Testing Setup

This project integrates **Cypress** with **Applitools Eyes** and pixel-level visual comparison for automated visual testing of the Visual Comfort website designer pages. Includes esbuild watch infrastructure for development.

## 📋 Prerequisites

- Node.js (v20.14.0 or higher; v20.18.1+ recommended for feature file support)
- npm
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

## ⚙️ esbuild Watch Scripts

For development: Automatically rebuild your app files when they change using esbuild's context API.

### CommonJS Watcher
```bash
npm run watch:esbuild
```
- **Entry:** `app.js`
- **Output:** `out.js`
- **Command:** `node scripts/esbuild-watch.js`
- **Compatible:** Node v14+ and Windows PowerShell

### ESM Watcher
```bash
npm run watch:esbuild:esm
```
- **Entry:** `app.js`
- **Output:** `out.js`
- **Command:** `node --input-type=module scripts/esbuild-watch.mjs`
- **Requires:** Node v12.20+ with ESM support

Both watchers use the esbuild context API (`esbuild.context()` + `ctx.watch()`) for efficient incremental rebuilds.

**To customize entry/output:**
Edit `scripts/esbuild-watch.js` or `scripts/esbuild-watch.mjs`:
```javascript
const ctx = await esbuild.context({
  entryPoints: ['YOUR_ENTRY.js'],  // ← Change this
  bundle: true,
  outfile: 'YOUR_OUTPUT.js',       // ← Change this
});
```

**Development Workflow:**
```bash
# Terminal 1: Start watcher (background)
npm run watch:esbuild

# Terminal 2: Open Cypress
npm run test:open
```
When you edit source files, esbuild automatically rebuilds and Cypress reruns tests.

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
│   ├── visual-test.cy.js              # Anne-Marie Barton PLP tests (5 tests)
│   └── features/
│       ├── anne-marie-barton-plp.feature  # BDD feature file for Anne-Marie
│       └── home-page-visual.feature       # BDD feature file for home page
├── tasks/
│   └── compareImages.js                # Pixel-level comparison task (pixelmatch)
├── screenshots/                        # Test screenshots and baselines
├── snapshots/                          # Image diff comparisons
├── support/
│   └── e2e.js                         # Support file (imports Eyes)
└── downloads/                          # Downloaded files during tests
scripts/
├── esbuild-watch.js                    # CommonJS esbuild watcher
└── esbuild-watch.mjs                   # ESM esbuild watcher
cypress.config.js                       # Cypress configuration with preprocessor
package.json                           # Dependencies and npm scripts
.github/workflows/ci.yml                # GitHub Actions CI workflow
README.md                               # This file
```

## 🎯 Test Coverage

The Anne-Marie Barton PLP test suite (`visual-test.cy.js`) includes 5 comprehensive tests:

1. **Test 1: Page Load** - Verifies page loads successfully with HTTP 200 status
2. **Test 2: Scroll & Capture** - Captures page content after scrolling
3. **Test 3: Full Snapshot** - Takes full page visual snapshot
4. **Test 4: Visual Rendering & Image Integrity** - BDD scenario validating:
   - Images load with correct dimensions (naturalWidth/naturalHeight > 0)
   - Product cards have consistent alignment in grid
   - Page renders without broken content
5. **Test 5: Baseline Comparison** - Compares current snapshot against baseline (allows 20% mismatch)

**Test Results (Headless):**
- Status: ✅ All 5 tests passing
- Duration: ~1m 20s
- Screenshots: 6 captured and stored

## 🔧 How It Works

1. **Screenshot Capture**: Tests capture full-page screenshots and save to `cypress/screenshots/`
2. **Pixel Comparison**: Uses pixelmatch to compare current vs. baseline images
   - **Threshold:** 0.1 (1% pixel difference)
   - **Allowed mismatch:** 20% (realistic rendering variance)
3. **Diff Generation**: Mismatch images written to `cypress/snapshots/diff-*.png`
4. **Applitools Dashboard** (optional): When API key set, results sync to Applitools dashboard
5. **CI/Headless**: Best results in headless mode; Eyes checkpoints disabled in headed mode to prevent buffer overflow on large screenshots

## 📊 Viewing Results

**Pixel Comparison Results:**
- Check `cypress/screenshots/` for captured screenshots
- Check `cypress/snapshots/` for diff images (if mismatches found)
- Terminal output shows mismatch percentage for each comparison

**Applitools Dashboard Results (Optional):**
1. Go to https://applitools.com and log in
2. Navigate to "Test Results"
3. Review visual differences detected (if API key configured)

## 🛠️ Customization & Configuration

### Modify Viewport Size

Edit `cypress.config.js`:
```javascript
viewportWidth: 1920,
viewportHeight: 1080,
```

### Change Base URL

Edit `cypress.config.js`:
```javascript
baseUrl: 'https://your-domain.com',
```

### Adjust Image Comparison Tolerance

Edit `cypress/e2e/visual-test.cy.js`:
```javascript
cy.task('compareImages', {
  expected: baselinePath,
  actual: currentPath,
  threshold: 0.1,      // Pixel difference threshold (0-1)
  diffName: 'diff'
});
```

### Add More Tests

Create a new `.cy.js` file in `cypress/e2e/` and follow the pattern in `visual-test.cy.js`.

## 🐛 Troubleshooting

### Tests fail in headed mode with buffer errors
- **Cause:** Large screenshot processing in interactive Test Runner
- **Solution:** Run in headless mode (`npm test`) or disable Eyes checkpoints

### esbuild watch doesn't start
- **CommonJS:** Verify `esbuild` is installed: `npm ls esbuild`
- **ESM:** Ensure Node v12.20+: `node --version`
- **Fix:** Run clean install: `npm install`

### Image comparison timeout
- Increase timeouts in `cypress.config.js`:
  ```javascript
  defaultCommandTimeout: 15000,
  responseTimeout: 15000,
  ```

### Feature files not detected
- **Requirement:** Node v20.18.1 or higher (your local: v20.14.0)
- **Solution:** Upgrade Node or use `.cy.js` tests
- To enable `.feature` files with Node >=20.18.1:
  1. Edit `cypress.config.js`
  2. Update `specPattern` to include `'cypress/e2e/features/**/*.feature'`

### Tests pass headless but fail in Test Runner
- Check `cypress/screenshots/` for what was captured
- Try scrolling viewport to see if it's a scrolling/visibility issue
- Verify images load: Use browser DevTools to inspect network

### npm scripts not working
- Clear node_modules: `rm -r node_modules package-lock.json`
- Reinstall: `npm install`
- Verify scripts in `package.json` exist and are correct

## 📦 npm Scripts Reference

| Script | Command | Purpose |
|--------|---------|---------|
| `test` | `cypress run` | Run all tests headless |
| `test:open` | `cypress open` | Open Cypress Test Runner GUI |
| `test:headed` | `cypress run --headed` | Run tests with browser visible |
| `test:chrome` | `cypress run --browser chrome` | Run in Chrome headless |
| `watch:esbuild` | `node scripts/esbuild-watch.js` | Start CommonJS esbuild watcher |
| `watch:esbuild:esm` | `node --input-type=module scripts/esbuild-watch.mjs` | Start ESM esbuild watcher |
| `upload:applitools` | `node upload-to-applitools.js` | Upload results to Applitools (if available) |

## 📚 Useful Links

- [Cypress Documentation](https://docs.cypress.io/)
- [Applitools Eyes Documentation](https://applitools.com/docs)
- [Applitools Eyes Cypress Plugin](https://github.com/applitools/eyes.cypress)
- [pixelmatch](https://github.com/mapbox/pixelmatch) - Image comparison library
- [esbuild](https://esbuild.github.io/) - JavaScript bundler

## 🎯 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run tests in headless mode (recommended)
npm test

# 3. Or open Cypress GUI for interactive testing
npm run test:open

# 4. (Optional) Start esbuild watcher for development
npm run watch:esbuild
```

## ✅ Key Features

- ✅ Visual testing with pixel-level comparison (pixelmatch)
- ✅ Applitools Eyes integration for dashboard results
- ✅ BDD feature files with Cucumber preprocessor
- ✅ esbuild bundling with Node built-in polyfills
- ✅ Image integrity validation
- ✅ Grid alignment and card consistency checks
- ✅ Headless + headed Test Runner support
- ✅ GitHub Actions CI/CD ready
- ✅ esbuild watch scripts for development workflow

## 📝 License

ISC

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review test logs in terminal
3. Inspect screenshots in `cypress/screenshots/`
4. Check diffs in `cypress/snapshots/`

---

**Ready to go!** Run `npm install` and then `npm test` to start visual testing.
