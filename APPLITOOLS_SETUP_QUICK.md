# 🚀 Applitools Eyes Quick Setup

## 3-Step Setup Guide

### Step 1️⃣: Get Your API Key (2 minutes)

1. Go to [Applitools Dashboard](https://eyes.applitools.com)
2. Sign up or log in
3. Click **Profile** (top right) → **Account Settings**
4. Copy your **API Key** (long alphanumeric string)

### Step 2️⃣: Set API Key (1 minute)

**Option A - PowerShell (Temporary for current session):**
```powershell
$env:APPLITOOLS_API_KEY = "paste_your_key_here"
```

**Option B - Create .env file (Permanent for this project):**

1. Create file `.env` in project root:
```
APPLITOOLS_API_KEY=paste_your_key_here
```

2. Install dotenv (if not installed):
```bash
npm install dotenv
```

### Step 3️⃣: Run Tests

```bash
npm test
```

**What happens:**
✅ Tests run in headless mode  
✅ 11 visual checkpoints captured  
✅ Results sent to Applitools dashboard  
✅ Baselines created/compared  

---

## 📊 View Results on Dashboard

After tests complete:

1. Go to [Applitools Dashboard](https://eyes.applitools.com)
2. Find app: **"Visual Comfort - Demo 3"**
3. Find batch: **"Cypress + Applitools Suite"**
4. Click on test run to see:
   - 6 Home page checkpoints
   - 5 Anne-Marie Barton checkpoints
   - Visual differences (if any)
   - Baseline comparisons

---

## 🎯 Visual Checkpoints

### Home Page (6 checkpoints)
```
✓ Home Page - Initial Load
✓ Home Page - Images Loaded with Scroll
✓ Home Page - Hero Section
✓ Home Page - Product Grid Alignment
✓ Home Page - Baseline vs Current Comparison
✓ Home Page - Responsive Layout 1280x1024
```

### Anne-Marie Barton (5 checkpoints)
```
✓ Anne Marie - Full Page Load
✓ Anne Marie - Page After Scroll
✓ Anne Marie - Full Page Snapshot
✓ Anne Marie - PLP Validation
✓ Anne Marie - Baseline Comparison Result
```

**Total: 11 visual checkpoints per test run**

---

## 🎨 Dashboard Features

### First Run
- Visual checkpoints saved as **baseline**
- Status: **"New"**
- No comparison results yet

### Future Runs
- Checkpoints compared against baseline
- **Pass** ✅ = No visual differences
- **Fail** ⚠️ = Visual differences detected
- Click to see diff images

### Review Differences
1. Click on checkpoint
2. See side-by-side comparison
3. View Applitools AI analysis
4. Accept or reject change
5. Update baseline if change is intentional

---

## 📝 Commands

**Run all tests with Applitools:**
```bash
npm test
```

**Run with heading visible (debug mode):**
```bash
npm run test:headed
```

**Run with Chrome browser:**
```bash
npm run test:chrome
```

**Run only interactive mode (no Applitools):**
```bash
npm run test:open
```

---

## ✅ Checklist

- [ ] Created Applitools account
- [ ] Copied API key
- [ ] Set `APPLITOOLS_API_KEY` environment variable
- [ ] Ran `npm test`
- [ ] Checked Applitools dashboard
- [ ] Saw 11 visual checkpoints
- [ ] Reviewed baseline snapshots

---

## 🎉 You're Done!

Your Applitools Eyes integration is now active. Every test run will:

1. ✅ Execute both test suites (Home Page + Anne-Marie Barton)
2. ✅ Capture 11 visual checkpoints
3. ✅ Compare against baselines
4. ✅ Send results to Applitools dashboard
5. ✅ Display in your account for review

---

**Questions?** See `APPLITOOLS_EYES_INTEGRATION_GUIDE.md` for detailed documentation.
