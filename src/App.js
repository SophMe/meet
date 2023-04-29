import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, getAccessToken, checkToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    warningText: "",
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.eventCount), locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    if (!navigator.onLine) {
      this.setState({
        warningText: "Your app is offline. Some features may not be available."
      });
    } else {
      this.setState({
        warningText: ""
      });
    }

    getEvents().then((events) => {
      const locationEvents = location === "all" ? events : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, this.state.eventCount), // What is this?
      });
    });
  }
  
updateEventCount = (event) => {
  const value = event.target.value;
  this.setState({
    eventCount: value,
    events: this.state.events.slice(0, value)
  });
}

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const {events} = this.state;
    console.log(events);
    return (
      <div className={`App ${this.state.showWelcomeScreen ? "hidden" : ""}`}>
        <WarningAlert text={this.state.warningText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents eventCount={this.state.eventCount} updateEventCount={this.updateEventCount} />
        <EventList events={this.state.events} />    {/* pass the state to EventList as a prop of events */}
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => {getAccessToken()}} />
      </div>
    );
  }
}

export default App;