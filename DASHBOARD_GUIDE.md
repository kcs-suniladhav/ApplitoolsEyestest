# 📊 Applitools Eyes Dashboard - Complete Instructions

## Your Setup Summary

```
✅ Cypress Tests:              3/3 Passing
✅ Screenshots Generated:       3 images captured
✅ API Key Configured:          Ready to use
✅ Documentation:               Complete

Your API Key: ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110
```

---

## 🎯 THE FASTEST WAY (3 Commands)

### Command 1: Install Applitools CLI (One Time)
```powershell
npm install -g @applitools/cli
```

### Command 2: Upload Screenshots
```powershell
applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 cypress/screenshots/
```

### Command 3: View Results
Open browser: **https://applitools.com** → Sign In → Test Results

---

## 📸 Your Screenshots

```
Location: D:\Applitooles eyes\Demo 3\cypress\screenshots\visual-test.cy.js\

Files:
├── 01-full-page-load.png (1280×2299)
├── 02-page-after-scroll.png (1280×5807)
└── 03-full-page-snapshot.png (1280×5807)
```

---

## 🔄 Complete Visual Testing Flow

```
START
  │
  ├─► npm run test
  │   └─► 3 screenshots generated
  │
  ├─► applitools eyes upload [API_KEY] cypress/screenshots/
  │   └─► Screenshots uploaded to Applitools
  │
  ├─► https://applitools.com
  │   ├─► Sign In
  │   ├─► Test Results
  │   └─► View Batch
  │
  └─► Approve Baseline
      └─► Ready for next test run
```

---

## 📱 Dashboard Walkthrough

### Step 1: Sign In
```
https://applitools.com/app
├── Username: Your email
├── Password: Your password
└── Sign In
```

### Step 2: Navigate to Test Results
```
Left Sidebar
├── Home
├── Test Results  ◄─── Click Here
├── Baselines
└── Settings
```

### Step 3: Find Your Batch
```
Test Results Page
├── Search: "Anne Marie Barton"
├── OR Scroll to find latest batch
└── Click on batch name
```

### Step 4: View Individual Tests
```
Batch View
├── 01-full-page-load
│   ├── Baseline image
│   ├── Current image
│   └── Comparison
├── 02-page-after-scroll
│   └── ...
└── 03-full-page-snapshot
    └── ...
```

---

## 📊 What Each Test Shows

### Test 1: Full Page Load
```
Timeline: 0s (Initial Load)
Content: Header, Hero Section
Size: 1280×2299 pixels
Shows: How page looks when first opened
```

### Test 2: Page After Scroll  
```
Timeline: 3s (After scroll down)
Content: Product listings, middle content
Size: 1280×5807 pixels
Shows: What user sees after scrolling
```

### Test 3: Full Page Snapshot
```
Timeline: 5s (Complete state)
Content: Full page height
Size: 1280×5807 pixels
Shows: Entire page in one image
```

---

## ✅ Dashboard Features You'll See

```
Each Test Display Shows:

┌──────────────────────────────┐
│ BASELINE      │ CURRENT      │
│ (Original)    │ (Latest)     │
│              │              │
│ Screenshot   │ Screenshot   │
│              │              │
│              │              │
└──────────────────────────────┘

Status: ✅ PASS  (No visual changes)

Match %: 100%

Actions Available:
✓ Approve   - Accept as new baseline
✗ Reject    - Flag as error  
💬 Comment  - Add notes
📥 Download - Save image
🔄 History  - View all runs
```

---

## 🎨 Understanding the Comparison View

### Match Result Types

**GREEN ✅ = PASS**
```
Result: Baseline matches current
Action: Optional approval
Meaning: No visual regression
```

**RED ❌ = FAIL**
```
Result: Images don't match
Action: Requires manual review
Meaning: Visual changes detected
```

**YELLOW ⚠️ = UNRESOLVED**
```
Result: First run or awaiting review
Action: Click "Approve" to set baseline
Meaning: Waiting for decision
```

---

## 🔍 Detailed Comparison Tools

### Side-by-Side View
```
Shows both baseline and current images
with differences highlighted in color
```

### Difference Highlighting
```
Red regions = Changes detected
Zoom in to see pixel-level diffs
```

### Thumbnail View
```
Quick overview of all tests
Click to zoom into specific test
```

---

## 💾 Dashboard Actions

### Approve Changes
```
1. Review screenshot
2. Click "APPROVE"
3. Confirms as new baseline
4. Next run will compare against this
```

### Add Comments
```
1. Click "Comment" button
2. Type your note
3. Share with team
4. Stays with test history
```

### Download Results
```
1. Click "Download" icon
2. Saves image to computer
3. Use for reports/presentations
```

### View History
```
1. Click "History" tab
2. See all previous runs
3. Track changes over time
4. Compare any two runs
```

---

## 📈 Batch Features

### See All Tests at Once
```
Batch Overview Shows:
├── Total tests: 3
├── Passed: X
├── Failed: Y
├── Unresolved: Z
└── Last run: [Date/Time]
```

### Filter & Search
```
Options:
├── Filter by status
├── Sort by date
├── Search by name
└── Compare batches
```

### Batch Statistics
```
Displays:
├── Average match %
├── Most changed areas
├── Trend over time
└── Performance metrics
```

---

## 🚀 Automation Integration

### For GitHub Actions
```yaml
- name: Upload Visual Tests
  env:
    APPLITOOLS_API_KEY: ${{ secrets.APPLITOOLS_API_KEY }}
  run: |
    npm run test
    applitools eyes upload -a $APPLITOOLS_API_KEY cypress/screenshots/
```

### For Jenkins
```groovy
stage('Visual Testing') {
    steps {
        sh 'npm run test'
        sh 'applitools eyes upload -a $APPLITOOLS_API_KEY cypress/screenshots/'
    }
}
```

### For Local CI
```powershell
npm run test
applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 cypress/screenshots/
```

---

## 📞 Troubleshooting Guide

### Problem: "Screenshots not found"
```
Solution:
1. Ensure npm run test was executed
2. Check folder: cypress/screenshots/visual-test.cy.js/
3. PNG files should be present
```

### Problem: "Invalid API key"
```
Solution:
1. Verify API key is correct
2. Copy from: https://applitools.com/app/settings/api-keys
3. Try again with correct key
```

### Problem: "Upload failed"
```
Solution:
1. Check internet connection
2. Verify firewall allows eyes.applitools.com
3. Try uploading again
```

### Problem: "Can't see batch on dashboard"
```
Solution:
1. Refresh the page (F5)
2. Wait 1-2 minutes (processing time)
3. Check date filter is correct
4. Try signing out and back in
```

---

## 🎯 Pro Tips

### Tip 1: Create npm Scripts
Add to package.json:
```json
{
  "scripts": {
    "test": "cypress run",
    "upload": "applitools eyes upload -a YOUR_KEY cypress/screenshots/"
  }
}
```

Then use:
```powershell
npm run test
npm run upload
```

### Tip 2: Batch Naming Convention
Use descriptive batch names:
```powershell
applitools eyes upload -a KEY -b "Chrome Desktop - v1.2.3" screenshots/
applitools eyes upload -a KEY -b "Firefox Mobile - v1.2.3" screenshots/
```

### Tip 3: Multiple Browsers
```powershell
npm run test:chrome
applitools eyes upload -a KEY -b "Chrome" screenshots/

npm run test:firefox
applitools eyes upload -a KEY -b "Firefox" screenshots/
```

### Tip 4: Organize by Date
```powershell
applitools eyes upload -a KEY -b "Daily Run - $(Get-Date -Format yyyy-MM-dd)" screenshots/
```

---

## ✅ Verification Checklist

- [ ] API key saved in .env
- [ ] Applitools CLI installed
- [ ] npm run test executed successfully
- [ ] Screenshots generated in cypress/screenshots/
- [ ] Uploaded using applitools command
- [ ] Can see batch on dashboard
- [ ] Can view individual test results
- [ ] Ready for next test run

---

## 🔗 Important Links

| Link | Purpose |
|------|---------|
| https://applitools.com | Main site |
| https://applitools.com/app | Dashboard |
| https://applitools.com/app/settings/api-keys | Get API key |
| https://applitools.com/docs | Documentation |

---

## 📝 Your Setup Summary

```
Project:        Cypress + Applitools Eyes
URL Tested:     https://stage7.visualcomfort.com/us/c/our-designers/anne-marie-barton
Tests:          3 scenarios (full page, scroll, snapshot)
Screenshots:    3 PNG images generated
API Key:        ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110
Dashboard:      https://applitools.com
Status:         ✅ READY TO USE
```

---

## 🎬 Quick Start (Copy & Paste)

```powershell
# Step 1: Install CLI (first time only)
npm install -g @applitools/cli

# Step 2: Generate screenshots
npm run test

# Step 3: Upload to Applitools
applitools eyes upload -a ZbWhE102oyMGeYWg111AARwAmWB95tBv0Sk98xCt94KsmCG0110 cypress/screenshots/

# Step 4: View results
# Open: https://applitools.com → Sign In → Test Results
```

---

**You're all set! Go check your test results! 🚀**

