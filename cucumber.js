{
  "default": {
    "dryRun": false,
    "require": [
      "cypress/support/stepDefinitions/**/*.js"
    ],
    "requireModule": [],
    "format": [
      "progress-bar",
      "html:cucumber-report.html"
    ],
    "formatOptions": {
      "snippetInterface": "async-await"
    }
  }
}
