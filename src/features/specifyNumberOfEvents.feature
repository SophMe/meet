Feature: SPECIFY NUMBER OF EVENTS

Scenario: User hasn’t specified a number, 32 is the default number
Given the user hasn't specified the number of events to display
When the list of events is loaded
Then the default number of events displayed is 32
         
Scenario: User can change the number of events they want to see
Given the list of events is open
When the user changes the number of events to display
Then the number of events displayed changes accordingly