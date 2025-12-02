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
