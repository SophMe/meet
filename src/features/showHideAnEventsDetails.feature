Feature: HIDE/SHOW AN EVENT'S DETAILS

Scenario: An event element is collapsed by default
Given the list of events is open
When the user views the events
Then each event element should be collapsed

Scenario: User can expand an event to see its details
Given the list of events is open
When the user clicks on an event
Then the event details should be displayed

Scenario: User can collapse an event to hide its details
Given the event details are displayed
When the user clicks on the event again
Then the event details should be hidden