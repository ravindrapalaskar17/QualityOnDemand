Feature: Test for the one-feature-per-file

@feature
Background:
  Given I have a Feature file with 2 backgrounds

Scenario: This is Scenario 1 for one-feature-per-file
 Given I have a file with 2 features
 Then I get a one-feature-per-file error


@scenariotag
Scenario: This is Scenario 2 for one-feature-per-file
 Given I have a file with 2 features
 Then I get a one-feature-per-file error
