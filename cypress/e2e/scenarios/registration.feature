Feature: Registration feature

  @suitability
  Scenario: Verify the creation of a new account
    Given go to Demo Casino web page
    And close the welcome pop-up modal
    And click on the registration button
    When enter the registration data
      | currency | password  | question                   | answer | bonus    | address | country | city | postcode | name | surname | middle_name | sex  |
      | EUR      | Password1 | The street your grew up on | test   | No bonus | address | Angola  | city | postcode | name | surname | middle_name | Male |
    And click on the submit registration button
    And wait and enter the verification code
    Then the notification "Your email address has been successfully verified" is shown
