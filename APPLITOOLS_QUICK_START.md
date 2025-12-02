# How to View Applitools Eyes Results - Quick Start Guide

## ✅ Your Setup is Ready!

Your Cypress tests are working perfectly:
- ✓ 3 tests passing
- ✓ 3 screenshots captured
- ✓ API key configured

---

## 📊 View Results on Applitools Dashboard

### Step 1: Visit Applitools

Open your browser and go to:
```
https://applitools.com
```

### Step 2: Sign In

Sign in with the account that owns this API key:
```
API Key: ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110
```

### Step 3: Navigate to Test Results

1. Click on **"Test Results"** in the left sidebar
2. Look for batch: **"Anne Marie Barton - Designer Page"**

---

## 🚀 Two Ways to Submit Screenshots to Applitools

### Method 1: Using Applitools CLI (Easiest)

Install Applitools CLI:
```powershell
npm install -g @applitools/cli
```

Upload your screenshots:
```powershell
eyes -k ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 cypress/screenshots/
```

### Method 2: Using Applitools Eyes Cypress Plugin

This is the professional integration. Install:

```powershell
npm install --save-dev @applitools/eyes-cypress
```

Then update your test file to use Eyes commands:

```javascript
describe('Visual Test', () => {
  beforeEach(() => {
    cy.eyesOpen({
      appName: 'Visual Comfort',
      testName: 'Anne Marie Barton'
    });
  });

  afterEach(() => {
    cy.eyesClose();
  });

  it('should match baseline', () => {
    cy.visit('https://stage7.visualcomfort.com/us/c/our-designers/anne-marie-barton');
    cy.eyesCheckWindow('Full Page');
  });
});
```

Then set your API key:
```powershell
$env:APPLITOOLS_API_KEY="ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110"
npm run test
```

---

## 📈 Your Dashboard Will Show

Once screenshots are uploaded, you'll see:

### Test Results View:
- 📸 **Baseline Images** - Your first run screenshots
- 📊 **Test Status** - Pass/Fail for each checkpoint
- 🔍 **Comparison** - Side-by-side visual comparison
- ✅ **History** - Track changes over time

### For Each Screenshot:
1. **01-full-page-load** - Designer page on initial load
2. **02-page-after-scroll** - Page content after scrolling down
3. **03-full-page-snapshot** - Complete page state

---

## 🎯 Your Current Screenshots

Your Cypress tests generated these images:

```
cypress/screenshots/visual-test.cy.js/
├── 01-full-page-load.png (1280×2299)
├── 02-page-after-scroll.png (1280×5807)
└── 03-full-page-snapshot.png (1280×5807)
```

Location: `D:\Applitooles eyes\Demo 3\cypress\screenshots\visual-test.cy.js\`

---

## 📋 Complete Setup Checklist

- ✅ Cypress installed
- ✅ Tests created
- ✅ Screenshots generated  
- ✅ API key configured
- ⏳ Submit screenshots to Applitools (Choose Method 1 or 2 above)

---

## 🔗 Important Links

- **Applitools Dashboard**: https://applitools.com
- **Account Settings**: https://applitools.com/app/settings
- **API Keys**: https://applitools.com/app/settings/api-keys
- **Cypress Plugin**: https://github.com/applitools/eyes.cypress
- **CLI Tool**: https://www.npmjs.com/package/@applitools/cli

---

## 💡 Pro Tips

1. **First Run = Baseline**
   - First submission creates the baseline
   - Future submissions compare against it

2. **Batch Tests**
   - All screenshots from one run are grouped
   - Makes comparison easier

3. **Approve Changes**
   - In the dashboard, you can approve visual changes
   - Marks them as the new baseline

4. **CI/CD Integration**
   - Add API key to environment variables
   - Run tests automatically on each commit

---

## 🆘 Need Help?

**Q: Where do I find my API key?**
A: Settings → API Keys → Copy your key

**Q: How do I reset my API key?**
A: Settings → API Keys → Generate New Key

**Q: Can I view results without uploading again?**
A: Yes! Go to applitools.com and sign in - all historical results are there

**Q: Do tests need to pass to upload?**
A: No! You can upload screenshots regardless of test status

---

## 🎬 Next Steps

1. Choose **Method 1** or **Method 2** above
2. Submit your screenshots
3. Go to https://applitools.com
4. Sign in and navigate to **Test Results**
5. Find your batch and view the visual comparison

Your visual testing setup is complete! 🎉

