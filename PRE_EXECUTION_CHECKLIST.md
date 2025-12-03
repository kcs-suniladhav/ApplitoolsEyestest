# ✅ PRE-EXECUTION CHECKLIST - Both Cucumber Feature Files

## 🎯 OBJECTIVE
Run both cucumber feature files on Cypress Test Runner (headless & interactive mode) with all code and step definitions verified.

---

## 📋 CODE PREPARATION CHECKLIST

### cypress.config.js
- [x] Enabled `.feature` files in specPattern
- [x] Includes both `.feature` and `.cy.js` patterns
- [x] Cucumber preprocessor configured
- [x] esbuild with polyfills configured
- [x] Viewport and timeouts set (1280×1024)

**Verification:**
```javascript
specPattern: ['cypress/e2e/features/**/*.feature', 'cypress/e2e/**/*.cy.js']
```

### cypress/support/pageObjects/objects.js
- [x] ANNE_MARIE_PAGE object complete (selector set)
- [x] GRIDBUSTER_PAGE object complete (selector set)
- [x] HOME_PAGE object added with 20+ selectors
- [x] Selectors use fallback chains (flexible matching)
- [x] All objects exported (including HOME_PAGE)

**New HOME_PAGE selectors:**
- heroSection, heroContent
- header, footer, navigation
- images, productCards, featuredItems
- searchBox, sortDropdown, filterButton
- productPrice, productName, addToCartButton
- + rating, reviews, breadcrumb

### cypress/support/stepDefinitions/stepDefinitions.js
- [x] Existing Anne-Marie steps (50+ for PLP scenarios)
- [x] NEW Home page steps (30+ for home-page-visual.feature)
- [x] All Given/When/Then implementations
- [x] Step definitions reference correct objects
- [x] Screenshot capture steps implemented
- [x] Image comparison logic implemented
- [x] Grid alignment validation implemented

**New Home Page Step Groups:**
- Navigation & Load (Given steps)
- Scrolling & Image Loading (When steps)
- Image Validation (Then steps)
- Hero Section Validation (Then steps)
- Grid Alignment Validation (Then steps)
- Baseline Capture & Comparison (Then steps)
- Responsive Layout Validation (Then steps)

### Feature Files
- [x] `cypress/e2e/features/anne-marie-barton-plp.feature` - Ready (5 scenarios)
- [x] `cypress/e2e/features/home-page-visual.feature` - Ready (7 scenarios)
- [x] Step definitions exist for all scenarios
- [x] No pending/missing step implementations

### JavaScript Tests
- [x] `cypress/e2e/visual-test.cy.js` - Ready (5 tests)
- [x] Will run alongside feature files

---

## 🔧 ENVIRONMENT CHECKLIST

### Current State
- [ ] Node version: v20.14.0 ❌ (Need ≥ v20.18.1)
- [ ] npm version: Check with `npm --version`
- [ ] npm packages: Not yet verified (will do after Node upgrade)

### Pre-Upgrade Verification
- [x] Current Node location: `C:\Program Files\nodejs\`
- [x] nvm-windows available: Download from https://github.com/coreybutler/nvm-windows
- [x] Direct installer available: https://nodejs.org

---

## 🚀 NODE UPGRADE STEPS (REQUIRED)

### Choose One Method:

**Method 1: Direct Installer (Fastest - 5 min)**
- [ ] Visit https://nodejs.org
- [ ] Download LTS version 20.18.1 or higher
- [ ] Run installer with admin rights
- [ ] Follow installation wizard
- [ ] Close and reopen PowerShell
- [ ] Verify: `node --version` (should show ≥ v20.18.1)

**Method 2: nvm-windows (Most Flexible - 10 min)**
- [ ] Download nvm-setup.exe: https://github.com/coreybutler/nvm-windows/releases
- [ ] Run installer with admin rights
- [ ] Close and reopen PowerShell
- [ ] Install Node: `nvm install 20.18.1`
- [ ] Use Node: `nvm use 20.18.1`
- [ ] Verify: `node --version` (should show v20.18.1)

**Method 3: Chocolatey (Easiest - 2 min)**
- [ ] Open PowerShell as admin
- [ ] Run: `choco upgrade nodejs --version 20.18.1`
- [ ] Verify: `node --version` (should show v20.18.1)

---

## ✅ POST-UPGRADE VERIFICATION

After Node upgrade complete:

### Verify Node Installation
```powershell
node --version        # Must be >= v20.18.1 ✓
npm --version         # Usually updates automatically ✓
where node            # Shows Node location ✓
```

### Install Dependencies
```powershell
cd "d:\Applitooles eyes\Demo 3"
npm install           # Should complete without major errors ✓
```

**Expected output:**
- up to date packages
- no critical vulnerabilities
- ready to run

### Verify Configuration
```powershell
npm test -- --dry-run
```

**Expected output:**
- Shows all discovered specs
- Includes both .feature files
- Includes visual-test.cy.js
- No Cucumber preprocessor errors

---

## 🧪 EXECUTION CHECKLIST

### Pre-Execution
- [ ] Node version verified: ≥ v20.18.1
- [ ] `npm install` completed successfully
- [ ] No console warnings about missing plugins
- [ ] Current directory: `d:\Applitooles eyes\Demo 3`
- [ ] All 4 PowerShell terminals ready (if running in parallel)

### Headless Test Execution (`npm test`)

**Before Running:**
- [ ] Terminal is in correct directory
- [ ] Node version confirmed
- [ ] npm dependencies installed

**During Execution:**
- [ ] Tests start loading (~5 seconds)
- [ ] Visual-test.cy.js starts first
- [ ] Anne-Marie feature file runs
- [ ] Home page feature file runs
- [ ] No errors in console output
- [ ] Cypress doesn't crash

**After Execution:**
- [ ] Tests complete with results summary
- [ ] Screenshots generated in `cypress/screenshots/`
- [ ] Pass/fail count shown in terminal
- [ ] All tests pass or show specific failure reasons
- [ ] Execution time: ~90 seconds

### Interactive Test Execution (`npm run test:open`)

**Before Running:**
- [ ] Terminal is in correct directory
- [ ] Node version confirmed
- [ ] npm dependencies installed
- [ ] Cypress not already running

**During Execution:**
- [ ] Cypress GUI opens within 10 seconds
- [ ] Specs sidebar shows 3 files:
  - [ ] visual-test.cy.js
  - [ ] anne-marie-barton-plp.feature
  - [ ] home-page-visual.feature
- [ ] Can click each spec file
- [ ] Tests run when clicked
- [ ] Command log shows steps

**After Execution:**
- [ ] All scenarios complete
- [ ] Screenshots visible in GUI
- [ ] No crashes or errors
- [ ] Can click "Run all" to run entire suite

---

## 📊 RESULTS VERIFICATION

### Screenshots Generated
- [ ] `cypress/screenshots/visual-test.cy.js/` - Contains .cy.js test screenshots
- [ ] `cypress/screenshots/` - Contains .feature file screenshots
- [ ] At least 20+ screenshots total
- [ ] Images are PNG format
- [ ] File sizes > 0 bytes (not empty)

**Expected screenshots:**
- Anne-Marie tests: 6-8 images per test
- Home page tests: 7+ images per scenario
- All properly named with descriptive prefixes

### Console Output Validation
- [ ] No "MODULE NOT FOUND" errors
- [ ] No "Cucumber preprocessor" errors
- [ ] No "Cannot find step" errors
- [ ] All steps logged with ✓ or ✗

### Test Results
- [ ] All Anne-Marie scenarios pass or show clear errors
- [ ] All home page scenarios pass or show clear errors
- [ ] Visual-test.cy.js tests pass or show clear errors
- [ ] No timeout errors
- [ ] No "connection refused" errors

---

## 🔍 TROUBLESHOOTING VERIFICATION

### If .feature files don't run:
- [ ] Check: `node --version` (must be ≥ v20.18.1)
- [ ] Check: `npm test -- --dry-run` (shows .feature files?)
- [ ] Solution: Re-upgrade Node if version is wrong

### If tests fail with "Cannot find step":
- [ ] Check: `cypress/support/stepDefinitions/stepDefinitions.js` has step definition
- [ ] Check: Step definition uses correct object (HOME_PAGE vs PLP_PAGE)
- [ ] Solution: Verify step definition exists and is properly exported

### If tests timeout:
- [ ] Check: Website `https://stage7.visualcomfort.com` is accessible
- [ ] Check: Network connection is stable
- [ ] Solution: Increase timeout in cypress.config.js (currently 10000ms)

### If screenshots don't generate:
- [ ] Check: `cypress/screenshots/` folder exists
- [ ] Check: Disk has space available
- [ ] Solution: Ensure folder permissions are correct

---

## 📈 SUCCESS METRICS

### Headless Execution Success
✅ Specifications passed ≥ 15 tests  
✅ Execution time: 60-120 seconds  
✅ Screenshots generated: ≥ 20 images  
✅ No critical errors  
✅ All scenarios logged  

### Interactive Execution Success
✅ Cypress GUI opens  
✅ All 3 spec files visible  
✅ Can run each spec individually  
✅ Command log displays steps  
✅ Screenshots appear in GUI  

### Code Quality Metrics
✅ cypress.config.js: specPattern includes .feature files  
✅ pageObjects/objects.js: HOME_PAGE exported  
✅ stepDefinitions.js: 30+ home page steps  
✅ Feature files: All scenarios have step definitions  

---

## 📝 FINAL SIGN-OFF

Once all checkboxes are verified:

- [ ] **Code Preparation**: All files updated ✓
- [ ] **Node Upgraded**: v20.18.1+ installed ✓
- [ ] **Dependencies**: npm install successful ✓
- [ ] **Headless Tests**: npm test passes ✓
- [ ] **Interactive Tests**: npm run test:open works ✓
- [ ] **Screenshots**: Generated in correct locations ✓
- [ ] **Results**: All tests visible and passing ✓

---

## 🎉 READY FOR PRODUCTION

Once all checkboxes above are complete:

```powershell
# Regular execution (use these commands):
npm test              # For CI/headless runs
npm run test:open     # For development/debugging

# Both cucumber feature files will execute automatically ✨
```

---

## 📞 SUPPORT RESOURCES

- **QUICK_START.md** - 2-minute reference
- **NODE_UPGRADE_GUIDE.md** - Detailed Node upgrade instructions
- **IMPLEMENTATION_COMPLETE.md** - Full status and execution
- **CUCUMBER_SETUP_COMPLETE.md** - Technical details
- **SUMMARY.md** - Quick overview

**All documentation is in:** `d:\Applitooles eyes\Demo 3\`

---

**Status: READY FOR NODE UPGRADE AND EXECUTION** ✅
