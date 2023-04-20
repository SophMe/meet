import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    warningText: ""
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
       this.setState({ events: events.slice(0, this.state.eventCount), locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = location === "all" ? events : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, this.state.eventCount), // What is this?
      });
    });

    if (!navigator.onLine) {
      this.setState({
        warningText: "Your app is offline. Some features may not be available."
      });
    } else {
      this.setState({
        warningText: ""
      })
    }
  }
  
updateEventCount = (event) => {
  const value = event.target.value;
  this.setState({
    eventCount: value,
    events: this.state.events.slice(0, value)
  });
}

  render() {
    const {events} = this.state;
    console.log(events);
    return (
      <div className="app">
        <WarningAlert text={this.state.warningText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents eventCount={this.state.eventCount} updateEventCount={this.updateEventCount} />
        <EventList events={this.state.events} />    {/* pass the state to EventList as a prop of events */}
      </div>
    );
  }
}

export default App;