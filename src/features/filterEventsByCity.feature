Feature: EVENT FILTERING

Scenario: If user hasn't searched for a city, show upcoming events from all cities
Given the user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

Scenario: User should see a list of suggestions when they search for a city
Given the main page is open
When the user starts typing in the city text box
Then the user should see a list of cities (suggestions) that match their search

Scenario: User can select a city from the suggested list
Given the user was typing the name of a city (i.e. Berlin) in the city text box
And the list of suggested cities is showing
When the user selects a city from the list
Then their city should be set to that city (i.e. Berlin)
And the user should see a list of events in that city