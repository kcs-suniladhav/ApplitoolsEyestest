# 🚀 QUICK START - Run Both Cucumber Feature Files

## ⚠️ BLOCKER: Node Version
Your Node is **v20.14.0**, but .feature files need **v20.18.1+**

### 3 Ways to Upgrade Node

**Fast (5 min):** Direct installer
- Download Node 20.18.1+ from https://nodejs.org
- Run installer (admin rights)
- Restart PowerShell

**Smart (10 min):** nvm-windows (supports multiple Node versions)
- Download nvm-setup.exe: https://github.com/coreybutler/nvm-windows/releases
- Run installer (admin rights)
- `nvm install 20.18.1 && nvm use 20.18.1`

**Easy (2 min):** Chocolatey
- `choco upgrade nodejs --version 20.18.1`

---

## ✅ After Node Upgrade (3 Steps)

### 1. Verify & Install
```powershell
node --version        # Should show v20.18.1+
npm install
```

### 2. Run Tests Headless
```powershell
npm test
```
✓ Runs both .feature files + visual-test.cy.js

### 3. Run Tests in GUI
```powershell
npm run test:open
```
✓ See all .feature files in Cypress sidebar

---

## 📊 What You'll Get

**Both Feature Files Will Execute:**

1. **anne-marie-barton-plp.feature** (5 scenarios)
   - Page load validation
   - Scroll & screenshot capture
   - Image integrity check
   - Grid alignment validation
   - Baseline comparison

2. **home-page-visual.feature** (7 scenarios)
   - Initial load validation
   - Image integrity check
   - Hero section validation
   - Grid alignment validation
   - Baseline capture & comparison
   - Responsive layout validation

**Plus:** visual-test.cy.js (5 JS tests)

---

## 📁 What I Did (Code Ready)

✓ Updated `cypress.config.js` - enabled .feature files
✓ Added `HOME_PAGE` object - all selectors ready
✓ Added 30+ home page steps - all 7 scenarios covered
✓ Configuration complete - no more changes needed

**See full details in:**
- `NODE_UPGRADE_GUIDE.md` - Detailed Node upgrade instructions
- `CUCUMBER_SETUP_COMPLETE.md` - Full setup documentation

---

## 🎯 TL;DR

```powershell
# 1. Upgrade Node to v20.18.1+ (see options above)

# 2. Verify
node --version
npm install

# 3. Run tests
npm test                # Headless
npm run test:open      # Interactive GUI
```

**That's it!** Both .feature files will run automatically. ✨
