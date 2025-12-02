# Quick Start Guide - Cypress + Applitools Eyes

## ⚡ 5-Minute Setup

### Step 1: Get Your API Key (2 minutes)
1. Visit https://applitools.com
2. Click "Sign Up for Free"
3. Create your account
4. Go to Settings → API Key
5. Copy your API Key

### Step 2: Set API Key (1 minute)

**Windows PowerShell:**
```powershell
$env:APPLITOOLS_API_KEY = "ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110"
```

### Step 3: Run Tests (2 minutes)

```powershell
npm run test:open
```

This opens Cypress interactive mode. Click on `visual-test.cy.js` to run the tests.

---

## 📌 Important Files

| File | Purpose |
|------|---------|
| `cypress/e2e/visual-test.cy.js` | Contains all visual tests |
| `cypress.config.js` | Cypress settings |
| `package.json` | Dependencies and scripts |

---

## 🎬 What Happens

1. **First Run**: Tests execute and create visual baselines in Applitools
2. **View Results**: Go to https://applitools.com → Test Results
3. **Future Runs**: Tests compare current screenshots to baselines

---

## 🚀 Available Commands

```bash
npm run test:open      # Open interactive mode
npm run test           # Run in headless mode
npm run test:headed    # Run with browser visible
npm run test:chrome    # Run specifically in Chrome
```

---

## 🎯 Test Details

**URL Being Tested:**
```
https://stage7.visualcomfort.com/us/c/our-designers/anne-marie-barton
```

**Visual Checkpoints:**
1. Full page load
2. Designer info section
3. Page after scrolling

---

## 💡 Tips

- Environment variable must be set BEFORE running tests
- First run will be slower (baseline creation)
- Check Applitools dashboard after each run
- All tests use viewport 1280×1024 by default

---

## ❓ Need Help?

- [Cypress Docs](https://docs.cypress.io/)
- [Applitools Docs](https://applitools.com/docs)
- See README.md for detailed information

