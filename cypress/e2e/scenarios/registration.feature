Feature: Registration feature

  @suitability
  Scenario: Create a new account
    Given go to Demo Casino web page
    And close the welcome pop-up modal
    And click on the registration button
    When enter the registration data
    And click on the submit registration button
    And wait and enter the verification code
    Then the notification "Your email address has been successfully verified" is shown
