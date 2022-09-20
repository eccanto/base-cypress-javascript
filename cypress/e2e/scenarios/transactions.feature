Feature: Transaction filtering feature

  @suitability
  Scenario Outline: Verify transaction currency filters
    Given go to Demo Casino web page
    And close the welcome pop-up modal
    And click on the login button
    And enter the login account
    When apply the "<currency>" currency filter
    Then all transactions in the table use currency "<currency>"

    Examples:
      | currency |
      | USD      |
      | EUR      |
      | ILS      |
      | mLTC     |
      | mDOGE    |
      | mBCH     |
      | mETH     |
      | RUB      |
      | BYR      |
