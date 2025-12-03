Feature: Home Page Visual Testing and Alignment Validation

  Background:
    Given the user navigates to the home page
    And the page should load with HTTP 200 status
    And the page body should be visible

  Scenario: Validate home page initial load
    When the page is fully loaded
    Then the home page should display without errors
    And the page title should be valid
    And Applitools Eyes should capture the initial page load

  Scenario: Validate home page image integrity
    When the user scrolls through the entire page
    And all images are loaded
    Then all visible images should be properly loaded
    And no images should have broken src attributes
    And all images should have valid dimensions
    And Applitools Eyes should capture the scrolled page

  Scenario: Validate hero section visual alignment
    When the page is fully loaded
    Then a hero section should exist on the page
    And the hero section should be visible
    And the hero section should contain content
    And the hero section should be properly centered or aligned
    And Applitools Eyes should capture the hero section

  Scenario: Validate home page product grid alignment
    When the page is fully loaded
    Then product items or featured sections should exist
    And all product items should be organized in rows
    And items within each row should have consistent heights
    And the grid layout should be properly aligned
    And Applitools Eyes should capture the grid alignment

  Scenario: Capture home page baseline for visual regression testing
    When the page is fully loaded
    And the user scrolls through the entire page
    Then a baseline snapshot should be captured
    And the baseline should include all page sections
    And the baseline should be stored for future comparisons

  Scenario: Compare home page visual regression against baseline
    When the page is fully loaded
    And the current page snapshot is captured
    Then the current snapshot should be compared with baseline
    And visual differences should be within acceptable threshold
    And the mismatch percentage should not exceed 25%
    And the diff report should be generated and stored

  Scenario: Validate responsive layout sections
    When the page is fully loaded
    Then the header should be visible and properly formatted
    And the footer should be visible and properly formatted
    And navigation elements should be accessible
    And all sections should have appropriate spacing
    And Applitools Eyes should capture the responsive layout
