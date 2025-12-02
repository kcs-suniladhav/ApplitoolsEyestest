# 🎬 How to View Test Results on Applitools Eyes Dashboard

## Your API Key
```
ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110
```

---

## 📊 3-Step Process to View Results

### Step 1: Generate Screenshots ✅ (Already Done)

```powershell
npm run test
```

Your screenshots are saved at:
```
D:\Applitooles eyes\Demo 3\cypress\screenshots\visual-test.cy.js\
```

**Generated files:**
- `01-full-page-load.png`
- `02-page-after-scroll.png`
- `03-full-page-snapshot.png`

---

### Step 2: Upload to Applitools (Choose ONE method)

#### 🌟 EASIEST METHOD: Using Applitools CLI

**Install (one time only):**
```powershell
npm install -g @applitools/cli
```

**Upload your screenshots:**
```powershell
applitools eyes upload `
  -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 `
  -b "Anne Marie Barton Visual Tests" `
  cypress/screenshots/
```

**Or shorter version:**
```powershell
applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 cypress/screenshots/
```

**Expected Output:**
```
Uploading screenshots...
✓ 01-full-page-load.png uploaded
✓ 02-page-after-scroll.png uploaded
✓ 03-full-page-snapshot.png uploaded

✅ Upload complete!
📊 View results: https://eyes.applitools.com/...
```

---

#### Alternative Method: Manual Dashboard Upload

1. Open browser: https://applitools.com
2. Click "Sign In"
3. Use your Applitools account credentials
4. Navigate to "Test Results"
5. Create a new batch
6. Click "Upload Images"
7. Select and upload the 3 PNG files from `cypress/screenshots/visual-test.cy.js/`

---

### Step 3: View Results on Dashboard ✨

**Go to:** https://applitools.com

1. **Sign In** with your account
2. Click **"Test Results"** 
3. Find your batch: **"Anne Marie Barton Visual Tests"**
4. Click to view:
   - 📸 Full page screenshots
   - 📊 Visual comparison
   - ✅ Test status (Pass/Fail)
   - 📈 Historical trends

---

## 🎯 What You'll See on Dashboard

### For Each Test:
```
TEST: Full Page Load
├── Baseline Image
│   └── Initial capture from your first run
├── Current Image
│   └── Latest capture
└── Comparison View
    ├── Side-by-side
    ├── Highlighted differences (if any)
    └── Match percentage
```

### Batch Dashboard Shows:
- ✅ All 3 tests
- 📊 Overall status (Passed/Failed)
- 📈 Trend data
- 🔄 Run history
- 💾 Storage used

---

## 📋 Complete Quick Command

Copy and paste this entire command:

```powershell
npm install -g @applitools/cli; applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 -b "Anne Marie Barton Tests" cypress/screenshots/
```

This will:
1. Install Applitools CLI (if not already installed)
2. Upload all your screenshots
3. Provide a link to view results

---

## 🚀 Full Workflow Summary

```powershell
# Step 1: Run Tests (generates screenshots)
npm run test

# Step 2: Upload to Applitools
applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 cypress/screenshots/

# Step 3: Open the link provided or go to:
# https://applitools.com → Sign In → Test Results
```

---

## 💡 Pro Tips

### Automate with npm script

Add this to `package.json` scripts:

```json
"scripts": {
  "test": "cypress run",
  "upload:applitools": "applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 -b 'Anne Marie Barton Tests' cypress/screenshots/"
}
```

Then just run:
```powershell
npm run test
npm run upload:applitools
```

### For CI/CD (GitHub Actions, Jenkins, etc.)

Set API key as environment variable:
```bash
export APPLITOOLS_API_KEY=ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110
applitools eyes upload cypress/screenshots/
```

---

## 🔐 Security Note

**Keep your API key private!**
- Don't commit `.env` to git
- Use environment variables in CI/CD
- Rotate key if compromised
- Create different keys for different projects

---

## ✅ Verification Checklist

- [ ] Ran `npm run test` (screenshots generated)
- [ ] Installed Applitools CLI with `npm install -g @applitools/cli`
- [ ] Ran upload command with your API key
- [ ] Visited https://applitools.com
- [ ] Signed in successfully
- [ ] Found your test batch in "Test Results"
- [ ] Viewed visual comparisons

---

## 📞 Quick Links

- **Applitools Dashboard**: https://applitools.com
- **Get API Key**: https://applitools.com/app/settings/api-keys
- **CLI Help**: `applitools --help`
- **Documentation**: https://applitools.com/docs

---

## ❓ FAQ

**Q: Why aren't my screenshots showing?**
A: They may take up to 1 minute to process. Refresh the page.

**Q: How do I view only the first test?**
A: Click on the test name in the batch to see that test's details.

**Q: Can I download the screenshots?**
A: Yes, click the download icon on each test result.

**Q: Do I need to approve the results?**
A: Yes, on first run. Then mark as "Approved" to set as baseline.

**Q: What if I get an error during upload?**
A: Check that your API key is correct and that the screenshots folder exists.

---

**You're all set! 🎉 Go check your results on the dashboard!**

