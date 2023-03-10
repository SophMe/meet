# Meet App

This is a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. 
The application uses the Google Calendar API to fetch upcoming events.

## Key Features
- Filter events by city
- Show/hide event details
- Specify number of events
- Use the app when offline
- Add an app shortcut to the home screen
- View a chart showing the number of upcoming events by city

## User Stories 

### Feature 1: EVENT FILTERING
**Scenario 1: Show upcoming events from all cities**
- Given the user hasn’t searched for any city 
- When the user views the list of events 
- Then the user should see all upcoming events

**Scenario 2: User should see a list of suggestions when they search for a city**
- Given the main page is open When the user starts typing in the city text box 
- Then the user should see a list of cities that match their search

**Scenario 3: User can select a city from the suggested list**
- Given the user was typing "Berlin" in the city text box and the list of suggested cities is showing
- When the user selects a city from the list 
- Then their city should be set to „Berlin"

### Feature 2: SHOW/HIDE AN EVENT'S DETAILS
**Scenario 1: An event element is collapsed by default**
- Given the list of events is open 
- When the user views the events 
- Then each event element should be collapsed

**Scenario 2: User can expand an event to see its details**
- Given the list of events is open 
- When the user clicks on an event 
- Then the event details should be displayed

**Scenario 3: User can collapse an event to hide its details**
- Given the event details are displayed
- When the user clicks on the event again 
- Then the event details should be hidden

### Feature 3: SPECIFY NUMBER OF EVENTS
**Scenario 1: When user hasn’t specified a number, 32 is the default number**
- Given the list of events is open and the user hasn't specified the number of events to display 
- When the list of events is loaded 
- Then the default number of events to display should be 32

**Scenario 2: User can change the number of events they want to see**
- Given the list of events is open 
- When the user changes the number of events to display 
- Then the number of events displayed should change accordingly

### Feature: USE THE APP WHEN OFFLINE
**Scenario 1: Show cached data when there’s no internet connection**
- Given the user has loaded the app before and is offline 
- When the user views the app 
- Then the app should show the cached data

**Scenario 2: Show error when user changes the settings (city, time range)**
- Given the user is offline 
- When the user changes the city or time range 
- Then the app should show an error message

### Feature: DATA VISUALIZATION
**Scenario 1: Show a chart with the number of upcoming events in each city**
- Given the list of events is open 
- When the user views the event data visualization 
- Then a chart should be displayed showing the number of upcoming events in each city

## Serverless Functions
To handle the integration with the Google Calendar API a serverless function could be triggered when a user searches for events in a specific city or requests to see event details. The serverless function could then fetch the relevant data from the Google Calendar API and return it to the user.

When a user types a city into the search box, the serverless function could be triggered to fetch only events in that city and return them to the user.

For offline data storage, a serverless function could store event data in a database when the user is online. This way, when the user goes offline, the app can still display cached event data without needing to fetch new data from the API.

To handle errors that occur when the user is offline or when there is an error fetching data from the API, a serverless function could display an error message and allow the user to retry their action or try again later.

Finally, a serverless function could be used to generate a chart showing the number of upcoming events in each city. The function could fetch the relevant data from the API and then use a library like D3.js to generate the chart, which would be displayed to the user.
