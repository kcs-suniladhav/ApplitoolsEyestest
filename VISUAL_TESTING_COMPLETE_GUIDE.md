# 🎯 Complete Applitools Eyes Integration Guide

## Your Project Status

✅ **Cypress**: Installed and tests passing  
✅ **Screenshots**: Being captured automatically (3 per run)  
✅ **API Key**: Configured  
⏳ **Applitools Connection**: Ready to connect  

---

## 📊 How to View Results on Applitools Eyes Dashboard

### Quick Summary

Your API Key:
```
ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110
```

### Option A: Manual Dashboard Access (Fastest)

1. **Go to**: https://applitools.com
2. **Sign In**: Use your account credentials
3. **Navigate**: "Test Results" tab
4. **View**: Your test batches and results

### Option B: Use Applitools CLI (Recommended for Automation)

```powershell
# Install CLI globally
npm install -g @applitools/cli

# Submit your screenshots to Applitools
eyes -k ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 -f cypress/screenshots/

# Or with more details
applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 cypress/screenshots/
```

### Option C: Automated Integration (Most Professional)

Integrate directly in your test workflow:

```powershell
# 1. Run tests
npm run test

# 2. Screenshots are automatically saved to:
# D:\Applitooles eyes\Demo 3\cypress\screenshots\visual-test.cy.js\

# 3. Upload with CLI
applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 \
  -b "Anne Marie Barton Tests" \
  cypress/screenshots/
```

---

## 📁 Your Generated Screenshots

Location:
```
D:\Applitooles eyes\Demo 3\cypress\screenshots\visual-test.cy.js\
```

Files:
```
01-full-page-load.png              (1280×2299 pixels)
02-page-after-scroll.png           (1280×5807 pixels)
03-full-page-snapshot.png          (1280×5807 pixels)
```

---

## 🔄 Complete Workflow

```
┌─────────────────────────────────────────┐
│ 1. Run Cypress Tests                    │
│    npm run test                          │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ 2. Screenshots Generated                 │
│    cypress/screenshots/visual-test.cy.js│
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ 3. Upload to Applitools (Choose method) │
│    - CLI tool, or                        │
│    - Manual dashboard, or                │
│    - Cypress Eyes plugin                 │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ 4. View on Applitools Dashboard         │
│    https://applitools.com               │
│    → Sign In → Test Results             │
└─────────────────────────────────────────┘
```

---

## 🛠️ Setup Your Preferred Method

### Method 1: Applitools CLI (🌟 Easiest)

**Install once:**
```powershell
npm install -g @applitools/cli
```

**Submit screenshots each time:**
```powershell
# After running npm run test
applitools eyes upload \
  -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 \
  -b "Anne Marie Barton Designer Page" \
  cypress/screenshots/
```

**Create an alias for convenience:**
```powershell
# Add this to your npm scripts in package.json
"upload:eyes": "applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 -b 'Anne Marie Barton Tests' cypress/screenshots/"

# Then run:
npm run upload:eyes
```

### Method 2: Applitools Eyes Cypress Plugin (⭐ Professional)

**Install:**
```powershell
npm install --save-dev @applitools/eyes-cypress
npm install -g @applitools/eyes-cypress
```

**Update your test file:**
```javascript
// cypress/e2e/applitools-test.cy.js
import '@applitools/eyes-cypress';

describe('Anne Marie Barton - Visual Test', () => {
  beforeEach(() => {
    cy.eyesOpen({
      appName: 'Visual Comfort',
      testName: 'Designer Page - Anne Marie Barton'
    });
  });

  afterEach(() => {
    cy.eyesClose();
  });

  it('should match full page visual', () => {
    cy.visit('https://stage7.visualcomfort.com/us/c/our-designers/anne-marie-barton');
    cy.wait(2000);
    cy.eyesCheckWindow('Full Page Load');
  });

  it('should match after scroll', () => {
    cy.visit('https://stage7.visualcomfort.com/us/c/our-designers/anne-marie-barton');
    cy.wait(2000);
    cy.scrollTo('bottom');
    cy.eyesCheckWindow('After Scroll');
  });
});
```

**Run tests with API key set:**
```powershell
$env:APPLITOOLS_API_KEY="ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110"
npx cypress run --spec "cypress/e2e/applitools-test.cy.js"
```

### Method 3: Manual Upload on Dashboard

1. Go to: https://applitools.com
2. Sign in
3. Create new batch
4. Click "Upload Images"
5. Select your screenshots from:
   ```
   cypress/screenshots/visual-test.cy.js/
   ```

---

## 📊 Understanding Applitools Dashboard

### What You'll See

**Batch View:**
- All your test runs grouped together
- Status: ✅ Passed / ❌ Failed / ⚠️ Unresolved

**Test Details:**
- Baseline (first run)
- Current (latest run)
- Difference visualization
- Pixel-level comparison

**Actions You Can Take:**
- ✅ **Approve** - Mark as new baseline
- ❌ **Reject** - Flag as error
- 📝 **Comment** - Add notes
- 📊 **View History** - See all changes over time

---

## 🔐 API Key Security

### Safe Practices

✅ **DO:**
- Keep `.env` file local only
- Add `.env` to `.gitignore`
- Use `.env.example` as template in repo

❌ **DON'T:**
- Commit `.env` to git
- Share API key in emails/chat
- Hardcode in source files
- Push to public repositories

### Git Configuration

Add to `.gitignore`:
```
.env
.env.local
*.log
node_modules/
cypress/screenshots/
cypress/videos/
```

---

## 🎯 Your Test Coverage

**URL Being Tested:**
```
https://stage7.visualcomfort.com/us/c/our-designers/anne-marie-barton
```

**Visual Checkpoints:**

1. **Full Page Load** (1280×2299)
   - Initial page state
   - Header and navigation
   - Top hero section

2. **Page After Scroll** (1280×5807)
   - Scrolled to bottom
   - Product listings
   - Footer visible

3. **Full Page Snapshot** (1280×5807)
   - Complete vertical page
   - All content captured

---

## 📈 Common Use Cases

### Use Case 1: Regression Testing
```powershell
# Weekly regression check
npm run test
applitools eyes upload -a YOUR_API_KEY -b "Weekly Regression" cypress/screenshots/
```

### Use Case 2: CI/CD Pipeline
```yaml
# .github/workflows/visual-tests.yml
- name: Run Visual Tests
  run: npm run test

- name: Upload to Applitools
  env:
    APPLITOOLS_API_KEY: ${{ secrets.APPLITOOLS_API_KEY }}
  run: applitools eyes upload -a $APPLITOOLS_API_KEY cypress/screenshots/
```

### Use Case 3: Designer Comparison
```powershell
# Compare designs across browsers
npm run test:chrome
applitools eyes upload -a YOUR_API_KEY -b "Chrome Tests" cypress/screenshots/

npm run test:firefox
applitools eyes upload -a YOUR_API_KEY -b "Firefox Tests" cypress/screenshots/
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Check `.env` file has correct key |
| "Screenshots not found" | Run `npm run test` first |
| "Cannot connect to Applitools" | Check internet, firewall settings |
| "Batch not showing" | Wait a few moments, then refresh page |
| "Images uploaded but not visible" | May take up to 1 minute to process |

---

## 📚 Next Steps

1. ✅ Choose your upload method (CLI, Plugin, or Manual)
2. ✅ Set up your workflow script
3. ✅ Upload first batch of screenshots
4. ✅ View on dashboard
5. ✅ Approve as baseline
6. ✅ Run tests again and compare

---

## 🔗 Resources

- **Applitools Main**: https://applitools.com
- **Dashboard**: https://applitools.com/app
- **API Keys**: https://applitools.com/app/settings/api-keys
- **Cypress Plugin**: https://github.com/applitools/eyes.cypress
- **CLI Documentation**: https://www.npmjs.com/package/@applitools/cli
- **Eyes Integration**: https://applitools.com/docs/topics/general-concepts/visual-testing.html

---

## 📞 Getting Help

1. **From Applitools**: https://applitools.com/support
2. **API Documentation**: https://applitools.com/docs
3. **GitHub Issues**: https://github.com/applitools/eyes.cypress/issues
4. **Community**: https://applitools.com/community

---

**Ready to visualize? Let's go!** 🚀

