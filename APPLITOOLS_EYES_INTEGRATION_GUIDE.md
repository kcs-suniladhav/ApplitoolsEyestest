# 🎯 Applitools Eyes Integration Guide

## Overview

Both test suites (`home-page-test.cy.js` and `anne-marie-barton-test.cy.js`) are now fully integrated with **Applitools Eyes** for visual regression testing and dashboard reporting.

When tests run, visual checkpoints are automatically captured and sent to the Applitools dashboard for:
- ✅ Visual regression detection
- ✅ Baseline comparison
- ✅ AI-powered visual analysis
- ✅ Detailed diff reports
- ✅ Test history tracking

---

## 🚀 Quick Start

### Step 1: Get Applitools API Key

1. Go to [Applitools Dashboard](https://eyes.applitools.com)
2. Sign up or log in with your account
3. Click **Account Settings** (top right)
4. Copy your **API Key**

### Step 2: Set Environment Variable

**On Windows PowerShell:**
```powershell
$env:APPLITOOLS_API_KEY = "your_api_key_here"
```

**Or add to `.env` file in project root:**
```
APPLITOOLS_API_KEY=your_api_key_here
```

### Step 3: Run Tests

```bash
npm test
```

### Step 4: View Results

- Tests will run with visual checkpoints
- Results automatically upload to [Applitools Dashboard](https://eyes.applitools.com)
- Open dashboard to see:
  - Visual test results
  - Baseline comparisons
  - Diff images
  - Test history

---

## 📊 What's Integrated

### Home Page Tests (6 Tests)

| Test | Visual Checkpoints | Description |
|------|-------------------|-------------|
| **01 - Initial Load** | 1 checkpoint | Home page loads without errors |
| **02 - Images Loaded** | 1 checkpoint | Images load after scroll |
| **03 - Hero Section** | 1 checkpoint | Hero section visibility & alignment |
| **04 - Grid Alignment** | 1 checkpoint | Product grid rows & heights |
| **05 - Baseline Compare** | 1 checkpoint | Baseline vs current comparison |
| **06 - Responsive Layout** | 1 checkpoint | Responsive layout 1280x1024 |

**Total: 6 visual checkpoints per run**

### Anne-Marie Barton Tests (5 Tests)

| Test | Visual Checkpoints | Description |
|------|-------------------|-------------|
| **01 - Full Page Load** | 1 checkpoint | Designer PLP loads successfully |
| **02 - Page After Scroll** | 1 checkpoint | Page after full scroll |
| **03 - Full Page Snapshot** | 1 checkpoint | Complete page snapshot |
| **04 - PLP Validation** | 1 checkpoint | Visual rendering & integrity |
| **05 - Baseline Compare** | 1 checkpoint | Baseline vs current comparison |

**Total: 5 visual checkpoints per run**

---

## 🔍 Visual Checkpoints Captured

### Home Page Checkpoints
```
1. Home Page - Initial Load
2. Home Page - Images Loaded with Scroll
3. Home Page - Hero Section
4. Home Page - Product Grid Alignment
5. Home Page - Baseline vs Current Comparison
6. Home Page - Responsive Layout 1280x1024
```

### Anne-Marie Barton Checkpoints
```
1. Anne Marie - Full Page Load
2. Anne Marie - Page After Scroll
3. Anne Marie - Full Page Snapshot
4. Anne Marie - PLP Validation
5. Anne Marie - Baseline Comparison Result
```

---

## 🎨 Dashboard Features

### Visual Regression Detection
- Automatically compares current snapshots with baseline
- AI-powered visual analysis (includes human-like perception)
- Flags visual differences
- No false positives with Applitools AI

### Test History
- Track visual changes over time
- View all test runs
- Compare multiple baselines
- Regression analysis

### Diff Reports
- Pixel-by-pixel comparison
- Interactive diff viewer
- Highlight changed regions
- Download diff images

### Batch Organization
- All tests grouped under **"Cypress + Applitools Suite"** batch
- Easy to find and compare related tests
- Organized by app and test name

---

## 📝 Test Execution Flow

### During Test Run:

1. **beforeEach Hook:**
   ```javascript
   cy.eyesOpen({
     appName: 'Visual Comfort - Demo 3',
     testName: 'Home Page Visual Tests',
     batchName: 'Cypress + Applitools Suite',
     showLogs: true
   });
   ```
   - Opens Eyes for the test
   - Creates session on Applitools

2. **Visual Checkpoints (During Test):**
   ```javascript
   cy.eyesCheckWindow('Home Page - Initial Load');
   ```
   - Captures current page state
   - Sends to Applitools for processing
   - Compares with baseline (if exists)

3. **afterEach Hook:**
   ```javascript
   cy.eyesClose();
   ```
   - Closes Eyes session
   - Finalizes results
   - Uploads to dashboard

---

## ⚙️ Configuration Details

### Applitools Integration

**cypress.config.js - Already Configured:**
```javascript
// Applitools Eyes Cypress plugin (defensive)
try {
  require('@applitools/eyes-cypress')(module);
} catch (err) {
  console.warn('Applitools Eyes plugin not installed...');
}
```

**Test Files - Eyes Setup:**
```javascript
beforeEach(() => {
  cy.eyesOpen({
    appName: 'Visual Comfort - Demo 3',
    testName: 'Home Page Visual Tests',
    batchName: 'Cypress + Applitools Suite',
    showLogs: true
  });
});

afterEach(() => {
  cy.eyesClose();
});
```

### Environment Variables
```
APPLITOOLS_API_KEY     - Your API key (required)
APPLITOOLS_SERVER_URL  - (optional, uses default)
APPLITOOLS_BATCH_ID    - (optional, auto-generated)
APPLITOOLS_BATCH_NAME  - Set in eyesOpen() config
```

---

## 🎯 Running Tests with Applitools

### Option 1: Headless Mode (Recommended)
```bash
npm test
```
**Output:**
- All 11 tests run
- Visual checkpoints sent to Applitools
- Results available on dashboard
- No local diff images needed

### Option 2: Headed Mode
```bash
npm run test:headed
```
**Output:**
- Tests run in headed browser
- Visual checkpoints still sent to Applitools
- More observable execution

### Option 3: Specific Browser
```bash
npm run test:chrome
```
**Output:**
- Tests run in Chrome
- Visual checkpoints sent to Applitools
- Browser-specific rendering captured

---

## 📊 Dashboard Navigation

### Step 1: Go to Applitools Dashboard
- Open [https://eyes.applitools.com](https://eyes.applitools.com)
- Log in with your account

### Step 2: Find Your Tests
- Look for app: **"Visual Comfort - Demo 3"**
- Find batch: **"Cypress + Applitools Suite"**
- View test runs

### Step 3: Review Results
- Click on test run date
- See all visual checkpoints
- Compare with baseline
- View diff images
- Accept/reject changes

### Step 4: Analyze Differences
- Click on individual checkpoint
- View pixel-by-pixel diff
- See Applitools AI analysis
- Toggle diff regions

---

## ✅ Visual Checkpoint Details

### What Gets Captured

Each `cy.eyesCheckWindow()` captures:
- **Full page viewport** (1280x1024)
- **All visible content** (text, images, styling)
- **Color accuracy** (RGB values)
- **Layout integrity** (spacing, alignment)
- **Dynamic elements** (if present)

### What NOT Captured

- **Transient elements** (tooltips on hover)
- **Time-sensitive elements** (animations)
- **Non-visual changes** (console errors)
- **Dynamic content** (auto-rotating carousels)

### Baseline Comparison

**First Run:**
- No baseline exists
- Checkpoints saved as baseline
- Status: **"New"**

**Subsequent Runs:**
- Compared against baseline
- Differences flagged
- Status: **"Pass"** or **"Fail"** (visual diff > threshold)

---

## 🐛 Troubleshooting

### Issue: "Applitools Eyes plugin not installed"

**Solution:**
```bash
npm install @applitools/eyes-cypress
```

### Issue: "No API key provided"

**Solution - Option 1 (PowerShell):**
```powershell
$env:APPLITOOLS_API_KEY = "your_key_here"
npm test
```

**Solution - Option 2 (.env file):**
```
# Create file: .env in project root
APPLITOOLS_API_KEY=your_key_here
```

Then:
```bash
npm test
```

### Issue: "Tests run but no results on dashboard"

**Check:**
1. API key is correct and set
2. Internet connection is working
3. Applitools service is up
4. Check dashboard: https://eyes.applitools.com

**Logs:**
- Run with: `npm test` (see console output)
- Look for: "Open Applitools URL" in logs
- Check for errors about Eyes

### Issue: "Visual diff shows false positives"

**Applitools AI Handles:**
- Minor color variations
- Font rendering differences
- Anti-aliasing variations
- Date/time changes

**If too many false positives:**
1. Go to dashboard
2. Accept the change (mark as baseline)
3. Future runs will compare to new baseline

### Issue: "Tests timeout or fail"

**Check:**
- Network connectivity
- Applitools service status
- API key validity
- Wait times in tests (already optimized)

---

## 🔄 Baseline Management

### First Run - Create Baseline
```bash
npm test
```
- Tests run
- Checkpoints captured
- Saved as baseline on dashboard
- Status: **"New"**

### Second Run - Compare with Baseline
```bash
npm test
```
- Tests run
- Checkpoints compared with baseline
- If identical: **"Pass" ✅**
- If different: **"Fail" ⚠️** (for review)

### Update Baseline
**On Dashboard:**
1. Review visual diff
2. If change is intentional, click **"Accept"**
3. New baseline is set
4. Future comparisons use new baseline

### Multiple Baselines
- Keep track of which baseline is active
- Use batch organization for clarity
- Review change history in dashboard

---

## 📈 Best Practices

### 1. Wait for Content
```javascript
// ✅ GOOD - Wait for images to load
cy.scrollTo('bottom', { duration: 1500 });
cy.wait(1500);
cy.eyesCheckWindow('After Scroll');

// ❌ BAD - No wait, captures incomplete page
cy.eyesCheckWindow('After Scroll');
```

### 2. Consistent Viewport
```javascript
// ✅ GOOD - Set consistent viewport
cy.viewport(1280, 1024);
cy.eyesCheckWindow('Page at 1280x1024');

// ❌ BAD - Varying viewports create inconsistent baselines
cy.eyesCheckWindow('Page');
```

### 3. Meaningful Names
```javascript
// ✅ GOOD - Descriptive checkpoint names
cy.eyesCheckWindow('Home Page - Initial Load');
cy.eyesCheckWindow('Hero Section - After Scroll');

// ❌ BAD - Vague names
cy.eyesCheckWindow('Checkpoint 1');
cy.eyesCheckWindow('Test');
```

### 4. Batch Organization
```javascript
// ✅ GOOD - Clear batch naming
batchName: 'Cypress + Applitools Suite',
appName: 'Visual Comfort - Demo 3',

// ❌ BAD - Hard to find later
batchName: 'Batch1',
appName: 'App',
```

### 5. Stability for CI/CD
```javascript
// ✅ GOOD - Wait for elements before checkpoint
cy.get('img').should('have.length.greaterThan', 0);
cy.eyesCheckWindow('Images Loaded');

// ❌ BAD - Race condition
cy.eyesCheckWindow('Images Loaded');
```

---

## 📚 Additional Resources

### Applitools Documentation
- [Eyes Cypress Docs](https://applitools.com/docs/topics/sdk/the-eyes-sdk-in-cypress.html)
- [Dashboard Guide](https://applitools.com/docs/topics/dashboard/introducing-the-applitools-test-manager.html)
- [Visual Regression Testing](https://applitools.com/docs/topics/visual-testing.html)

### Our Setup
- **App Name:** Visual Comfort - Demo 3
- **Batch Name:** Cypress + Applitools Suite
- **Test Files:** home-page-test.cy.js, anne-marie-barton-test.cy.js
- **Checkpoints:** 11 total (6 + 5)

### API Key Management
- Store safely (don't commit to git)
- Use environment variables
- Use `.env` file (add to `.gitignore`)
- Rotate if compromised

---

## 🎓 Learning Path

### Beginner
1. Set API key
2. Run: `npm test`
3. Check dashboard results
4. Review visual checkpoints

### Intermediate
1. Accept/reject baselines
2. Review visual diffs
3. Understand AI analysis
4. Track test history

### Advanced
1. Custom checkpoint regions
2. Batch organization
3. CI/CD integration
4. Custom comparison rules

---

## ✨ Summary

**What You Have:**
- ✅ 11 visual checkpoints across 2 test suites
- ✅ Applitools Eyes fully integrated
- ✅ Dashboard reporting configured
- ✅ Baseline comparison ready

**What You Can Do:**
- ✅ Run tests with visual regression detection
- ✅ View results on Applitools dashboard
- ✅ Track visual changes over time
- ✅ Detect unintended visual regressions
- ✅ Compare multiple test runs

**Your Next Step:**
1. Set `APPLITOOLS_API_KEY` environment variable
2. Run `npm test`
3. Visit [Applitools Dashboard](https://eyes.applitools.com)
4. Review your visual test results! 🎉

---

**Version:** 1.0  
**Created:** December 4, 2025  
**Status:** Production Ready ✅  
**Visual Checkpoints:** 11 total  
**Integration Level:** Complete
