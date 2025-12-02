/**
 * Applitools Eyes Helper for Cypress Screenshots
 * This module sends Cypress screenshots to Applitools Eyes Dashboard
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const APPLITOOLS_API_KEY = process.env.APPLITOOLS_API_KEY;
const APPLITOOLS_SERVER_URL = process.env.APPLITOOLS_SERVER_URL || 'https://eyes.applitools.com';

class ApplitoolsHelper {
  constructor() {
    this.apiKey = APPLITOOLS_API_KEY;
    this.serverUrl = APPLITOOLS_SERVER_URL;
    this.sessionId = null;
    this.testId = null;
  }

  /**
   * Start a new visual test session
   */
  async startSession(appName, testName, viewport = { width: 1280, height: 1024 }) {
    try {
      const response = await axios.post(
        `${this.serverUrl}/api/sessions/start`,
        {
          appName,
          testName,
          viewport,
          branchName: 'main',
          parentBranchName: 'main',
        },
        {
          headers: {
            'X-Eyes-SDK-Type': 'cypress',
            'X-Eyes-SDK-Version': '1.0.0',
          },
          params: {
            apiKey: this.apiKey,
          },
        }
      );

      this.sessionId = response.data.sessionId;
      this.testId = response.data.testId;
      
      console.log(`✓ Started Applitools session: ${testName}`);
      return response.data;
    } catch (error) {
      console.error('Failed to start Applitools session:', error.message);
      throw error;
    }
  }

  /**
   * Upload a screenshot to Applitools
   */
  async checkImage(screenshotPath, tag) {
    try {
      if (!fs.existsSync(screenshotPath)) {
        throw new Error(`Screenshot not found: ${screenshotPath}`);
      }

      const imageBuffer = fs.readFileSync(screenshotPath);
      const base64Image = imageBuffer.toString('base64');

      const response = await axios.post(
        `${this.serverUrl}/api/checkimage`,
        {
          imageData: base64Image,
          tag,
          sessionId: this.sessionId,
          testId: this.testId,
        },
        {
          headers: {
            'X-Eyes-SDK-Type': 'cypress',
          },
          params: {
            apiKey: this.apiKey,
          },
        }
      );

      console.log(`✓ Uploaded screenshot to Applitools: ${tag}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to upload screenshot: ${error.message}`);
      throw error;
    }
  }

  /**
   * Close the visual test session
   */
  async closeSession() {
    try {
      const response = await axios.delete(
        `${this.serverUrl}/api/sessions/${this.sessionId}`,
        {
          params: {
            apiKey: this.apiKey,
            updateBaseline: false,
          },
        }
      );

      const { sessionUrl, isDifferent } = response.data;
      
      console.log(`✓ Closed Applitools session`);
      console.log(`📊 View results: ${sessionUrl}`);
      
      return {
        url: sessionUrl,
        isDifferent,
      };
    } catch (error) {
      console.error('Failed to close Applitools session:', error.message);
      throw error;
    }
  }

  /**
   * Get the test results URL
   */
  getResultsUrl() {
    return `${this.serverUrl}/app/test-results/${this.testId}`;
  }
}

module.exports = ApplitoolsHelper;
