#!/usr/bin/env node
/**
 * Upload Cypress Screenshots to Applitools Eyes
 * Usage: node upload-to-applitools.js
 */

const ApplitoolsHelper = require('./applitools-helper');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SCREENSHOTS_DIR = './cypress/screenshots/visual-test.cy.js';

async function uploadScreenshotsToApplitools() {
  const helper = new ApplitoolsHelper();

  try {
    // Validate API key
    if (!process.env.APPLITOOLS_API_KEY) {
      throw new Error('APPLITOOLS_API_KEY environment variable is not set');
    }

    console.log('🚀 Starting Applitools Eyes screenshot upload...\n');

    // Start a new test session
    await helper.startSession(
      'Visual Comfort - Designer Page',
      'Anne Marie Barton Page Visual Test'
    );

    // Find and upload all screenshots
    if (!fs.existsSync(SCREENSHOTS_DIR)) {
      console.warn(`⚠️  Screenshots directory not found: ${SCREENSHOTS_DIR}`);
      console.log('\nRun tests first with: npm run test');
      return;
    }

    const files = fs.readdirSync(SCREENSHOTS_DIR);
    const pngFiles = files.filter(f => f.endsWith('.png'));

    if (pngFiles.length === 0) {
      console.warn('No PNG screenshots found');
      return;
    }

    console.log(`Found ${pngFiles.length} screenshot(s)\n`);

    // Upload each screenshot
    for (const file of pngFiles) {
      const screenshotPath = path.join(SCREENSHOTS_DIR, file);
      const tag = file.replace('.png', '');
      
      console.log(`Uploading: ${tag}...`);
      await helper.checkImage(screenshotPath, tag);
    }

    // Close the session and get results URL
    const result = await helper.closeSession();

    console.log('\n✅ All screenshots uploaded successfully!\n');
    console.log('📊 View your results at:');
    console.log(result.url);
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Error uploading to Applitools:', error.message);
    process.exit(1);
  }
}

// Run the upload
uploadScreenshotsToApplitools();
