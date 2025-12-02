Feature: Gridbuster Designer PLP - Visual Testing and Page Rendering

  Background:
    Given the base URL is set to the Gridbuster PLP page
    And the page has completed initial load for Gridbuster

  Scenario: Load the Gridbuster designer page successfully
    When the user navigates to the Gridbuster designer page
    Then the Gridbuster PLP page should load successfully
    And the page body should be visible
    And a full page screenshot should be taken with name "gridbuster-01-full-page-load"

  Scenario: Capture page content with scroll and validate image integrity
    When the user navigates to the Gridbuster designer page
    And the page wait time of 2 seconds has elapsed
    And the user scrolls to the bottom of the page
    And wait 1 second for scroll to complete
    Then the page body should be visible
    Then all images should be displayed properly
    And all products/cards should be aligned correctly
    And a full page screenshot should be taken with name "gridbuster-02-page-after-scroll"

  Scenario: Validate grid alignment and product card consistency
    When the user navigates to the Gridbuster designer page
    And the page wait time of 3 seconds has elapsed
    Then all products/cards should be aligned correctly
    And all images should have valid natural width and height
    And products should be distributed across multiple rows
    And the product cards should have consistent heights with variance less than 20%
    And a full page screenshot should be taken with name "gridbuster-03-grid-validation"

  Scenario: Validate Gridbuster PLP page visual rendering and image integrity
    Given the user launches the Gridbuster designer PLP page
    Then the Gridbuster PLP page should load successfully with correct HTTP 200 status
    And the page title should display "Gridbuster"
    When the system scrolls through the full page to load all images
    Then all product images should be visible and not broken
    And all images should have proper dimensions greater than zero
    And all images should be properly aligned in the product grid layout
    And the product grid should have consistent row alignment
    And the product cards should have consistent heights with variance less than 20%
    And a baseline capture should be taken with name "gridbuster-04-validation-baseline"
    And the system should scroll back to top
    And a full page visual snapshot should be captured with name "gridbuster-05-full-page-snapshot"
    And the page structure should be consistent with required elements
    And there should be no visual differences detected in page rendering

  Scenario: Compare baseline capture with current page snapshot for Gridbuster
    Given a baseline screenshot named "gridbuster-04-validation-baseline.png" exists
    When the system captures a current full page snapshot with name "gridbuster-06-current-snapshot"
    Then the current snapshot should match the baseline "gridbuster-04-validation-baseline.png" with threshold 0.1
