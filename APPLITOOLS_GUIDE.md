# How to View Test Results on Applitools Eyes Dashboard

## 📋 Overview

This guide explains how to:
1. Run Cypress tests
2. Upload screenshots to Applitools Eyes
3. View results on the Applitools dashboard

---

## 🔑 Step 1: Verify Your API Key

Your API key is already configured in `.env.example`:

```
APPLITOOLS_API_KEY=ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110
```

**Important:** This API key is your account's secret. Keep it private!

---

## 🚀 Step 2: Run the Tests

Run Cypress tests to generate screenshots:

```powershell
npm run test
```

This will:
- Execute all test cases
- Capture 3 screenshots automatically
- Save them to `cypress/screenshots/visual-test.cy.js/`

Expected output:
```
✓ 3 passing (28s)
✓ 0 failing
✓ 3 screenshots captured
```

---

## 📤 Step 3: Upload Screenshots to Applitools

After tests complete, upload the screenshots to Applitools Eyes:

```powershell
npm run upload:applitools
```

### What Happens:

1. **Connects to Applitools** using your API key
2. **Reads screenshots** from the `cypress/screenshots/` directory
3. **Uploads each screenshot** as a visual baseline
4. **Creates a test batch** in your Applitools account
5. **Returns a link** to view results

### Example Output:

```
🚀 Starting Applitools Eyes screenshot upload...

✓ Started Applitools session: Anne Marie Barton Page Visual Test
Found 3 screenshot(s)

Uploading: 01-full-page-load...
✓ Uploaded screenshot to Applitools: 01-full-page-load
Uploading: 02-page-after-scroll...
✓ Uploaded screenshot to Applitools: 02-page-after-scroll
Uploading: 03-full-page-snapshot...
✓ Uploaded screenshot to Applitools: 03-full-page-snapshot

✓ Closed Applitools session

✅ All screenshots uploaded successfully!

📊 View your results at:
https://eyes.applitools.com/app/test-results/[test-id]
```

---

## 👁️ Step 4: View Results on Dashboard

### Option A: Using the Link from Terminal

The upload script provides a direct link - copy and open it in your browser.

### Option B: Visit Applitools Dashboard Manually

1. Go to https://applitools.com
2. Sign in with your account
3. Navigate to **Test Results**
4. Find your test batch: **"Anne Marie Barton - Designer Page"**
5. View individual test comparisons

### What You'll See:

- ✅ **Baseline Images**: Your original screenshots
- 📊 **Test Results**: Pass/Fail status
- 🔍 **Comparison View**: Side-by-side visual comparison
- 📈 **Trends**: Historical test data

---

## 🔄 Full Workflow

Run this complete workflow each time:

```powershell
# 1. Run tests and capture screenshots
npm run test

# 2. Upload to Applitools
npm run upload:applitools

# 3. Open the provided link or visit https://applitools.com
```

---

## 🛠️ Environment Setup

### Create `.env` File (Optional)

If you want local environment variables:

1. Create a file named `.env` in the project root
2. Add your API key:
   ```
   APPLITOOLS_API_KEY=ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110
   ```

The script will automatically read from this file.

---

## 📁 File Structure

```
project/
├── cypress/
│   ├── e2e/
│   │   └── visual-test.cy.js        # Test cases
│   ├── screenshots/                 # Generated screenshots
│   │   └── visual-test.cy.js/
│   │       ├── 01-full-page-load.png
│   │       ├── 02-page-after-scroll.png
│   │       └── 03-full-page-snapshot.png
│   └── support/
│       └── e2e.js
├── upload-to-applitools.js          # Upload script
├── applitools-helper.js             # Helper module
├── cypress.config.js                # Cypress config
└── package.json
```

---

## 🔐 Security Notes

- **Never commit your API key** to version control
- Add `.env` to `.gitignore`
- Keep `.env.example` as a template without actual secrets
- Consider using GitHub Secrets for CI/CD environments

---

## ❓ Troubleshooting

### Issue: "APPLITOOLS_API_KEY not set"

**Solution:**
```powershell
# Set environment variable temporarily
$env:APPLITOOLS_API_KEY="ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110"
npm run upload:applitools
```

### Issue: "Screenshots directory not found"

**Solution:**
```powershell
# Run tests first to generate screenshots
npm run test
```

### Issue: "Connection refused"

**Solution:**
- Check your internet connection
- Verify API key is correct
- Ensure firewall allows access to `eyes.applitools.com`

### Issue: "401 Unauthorized"

**Solution:**
- Your API key is invalid or expired
- Verify it matches your Applitools account
- Get a new key from: https://applitools.com/app/settings/api-keys

---

## 📚 Useful Links

- [Applitools Dashboard](https://applitools.com)
- [Applitools Documentation](https://applitools.com/docs)
- [Cypress Documentation](https://docs.cypress.io)
- [API Key Settings](https://applitools.com/app/settings/api-keys)

---

## 🎯 Next Steps

1. ✅ Run `npm run test` - Generate screenshots
2. ✅ Run `npm run upload:applitools` - Upload to Applitools
3. ✅ Open the results link - View on dashboard
4. ✅ Set baseline - Mark first run as baseline
5. ✅ Run again - Compare against baseline

---

## 📝 Tips

- **First run**: Creates baseline images
- **Subsequent runs**: Compares against baseline
- **Failures**: Marked if visual changes are detected
- **Approve**: Review and approve changes on dashboard

