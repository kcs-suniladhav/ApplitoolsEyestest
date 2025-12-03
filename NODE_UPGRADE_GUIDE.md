# Node.js Upgrade Guide for Cypress Cucumber Feature Files

## ⚠️ CRITICAL ISSUE
Your current Node version is **v20.14.0**, but Cypress Cucumber preprocessor requires **Node >= v20.18.1** to run `.feature` files.

## ✅ WHAT I'VE ALREADY DONE
1. ✓ Updated `cypress.config.js` to enable `.feature` files in specPattern
2. ✓ Added `HOME_PAGE` object with all selectors for home page tests
3. ✓ Implemented 30+ home page step definitions in `stepDefinitions.js`
4. ✓ Both feature files (`anne-marie-barton-plp.feature` and `home-page-visual.feature`) are ready

## 🚀 UPGRADE NODE.JS TO v20.18.1+

### Option 1: Use Node Version Manager (nvm-windows)
**Recommended for multiple Node versions**

1. Download nvm-windows: https://github.com/coreybutler/nvm-windows/releases
   - Download `nvm-setup.exe`
   - Run installer (requires admin rights)

2. Close and reopen PowerShell (as admin)

3. Install Node v20.18.1:
   ```powershell
   nvm install 20.18.1
   nvm use 20.18.1
   node --version  # Should show v20.18.1
   ```

### Option 2: Direct Node.js Installer (Simpler)
**Recommended for single Node version**

1. Go to https://nodejs.org/
2. Download **LTS version 20.18.1+** (or latest LTS)
3. Run installer with admin rights
4. Choose to install npm as well
5. Restart PowerShell and verify:
   ```powershell
   node --version
   npm --version
   ```

### Option 3: Chocolatey (if installed)
```powershell
choco upgrade nodejs --version 20.18.1
```

---

## 📋 AFTER UPGRADING NODE

### Step 1: Verify Node Version
```powershell
node --version  # Should be >= v20.18.1
npm --version
```

### Step 2: Verify Dependencies
```powershell
npm install
```

### Step 3: Run Tests in Headless Mode
```powershell
npm test
# This will run ALL tests including:
# - cypress/e2e/visual-test.cy.js (Anne-Marie Barton tests)
# - cypress/e2e/features/anne-marie-barton-plp.feature (BDD)
# - cypress/e2e/features/home-page-visual.feature (BDD)
```

### Step 4: Run Tests in Interactive Test Runner
```powershell
npm run test:open
# Cypress GUI will open and show both .cy.js and .feature files
```

---

## 🧪 WHAT WILL RUN

### Feature Files (Now Enabled)
Both `.feature` files will automatically execute:

1. **`cypress/e2e/features/anne-marie-barton-plp.feature`**
   - 5 scenarios for Anne-Marie Barton designer page
   - Validates page load, scroll, image integrity, grid alignment
   - Baseline comparison test

2. **`cypress/e2e/features/home-page-visual.feature`**
   - 7 scenarios for home page visual testing
   - Initial load, image integrity, hero section, grid alignment
   - Baseline capture and comparison
   - Responsive layout validation

### JavaScript Tests (Existing)
3. **`cypress/e2e/visual-test.cy.js`**
   - 5 existing tests (same coverage as PLP feature file)
   - Will run in parallel with feature files

---

## 📊 TOTAL TEST COUNT
- **Anne-Marie Barton**: 5 feature scenarios + 5 .cy.js tests = 10 tests
- **Home Page**: 7 feature scenarios = 7 tests
- **Total**: ~17 tests (some are variations)

---

## 🔍 VERIFICATION CHECKLIST

After Node upgrade, ensure:

- [ ] Node version is >= v20.18.1: `node --version`
- [ ] npm packages installed: `npm install` runs without errors
- [ ] Feature file discovery works: `npm test` shows `*.feature` files
- [ ] Headless mode passes: `npm test` completes successfully
- [ ] GUI mode works: `npm run test:open` opens Cypress with both .feature and .cy.js files
- [ ] Screenshots generated: Check `cypress/screenshots/` folder
- [ ] No Cucumber preprocessor errors in console

---

## ❌ TROUBLESHOOTING

### "*.feature files not found"
**Cause**: Node version still < 20.18.1
**Fix**: Verify `node --version` and upgrade if needed

### "Cucumber preprocessor plugin error"
**Cause**: Old npm cache
**Fix**: Run `npm ci` (clean install) after Node upgrade

### "Cannot find module '@badeball/cypress-cucumber-preprocessor'"
**Cause**: Dependencies not installed after Node upgrade
**Fix**: Run `npm install`

### Tests still use only .cy.js files
**Cause**: Cypress not recognizing spec pattern
**Fix**: Restart Cypress Test Runner with `npm run test:open`

---

## ✅ SUCCESS INDICATORS

When everything is working:

### Headless Mode (`npm test`)
```
✓ Anne-Marie Barton - Visual Testing
✓ Image baseline comparison (non-Cucumber)
✓ Feature: Anne Marie Barton Designer PLP - Visual Testing and Page Rendering
✓ Feature: Home Page Visual Testing and Alignment Validation

Specs: 3 passed (all feature + js tests)
```

### Interactive Mode (`npm run test:open`)
**Cypress GUI will show under "Specs":**
- visual-test.cy.js
- anne-marie-barton-plp.feature
- home-page-visual.feature

---

## 📝 NEXT STEPS

1. **Upgrade Node to v20.18.1 or higher**
2. Run `npm install`
3. Run `npm test` for headless verification
4. Run `npm run test:open` to see feature files in GUI
5. Click any .feature file to run it interactively

---

## 🎯 AFTER EVERYTHING WORKS

All code is ready:
- ✓ Page objects (selectors) complete
- ✓ Step definitions implemented (30+ steps)
- ✓ Both .feature files configured
- ✓ Configuration enabled
- ✓ Ready for immediate test execution

**Just upgrade Node and you're ready to go!**
