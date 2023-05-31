import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, getAccessToken, checkToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis,YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

// get cities and number of events for chart
getData = () => {
  const {locations, events} = this.state;
  const data = locations.map((location)=>{
    const number = events.filter((event) => event.location === location).length
    const city = location.split(', ').shift()
    return {city, number};
  })
  return data;
};

  render() {
    if (this.state.showWelcomeScreen === undefined)
    return <div className="App" />
    const { locations, eventCount, events} = this.state;
    return (
      <div className="app-container">
        <div className="App">
          <h2>Meet App</h2>
          <h3>Choose your nearest city</h3>
          <WarningAlert text={this.state.warningText} />
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents updateEventCount={this.updateEventCount} eventCount={eventCount}
          />
          <h3>Events in each City</h3>
            <div className="data-vis-wrapper">
              <ResponsiveContainer height={400}>
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20, }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="city" type="category" name="city" />
                  <YAxis dataKey="number" type="number" name="number of events" allowDecimals={false} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={this.getData()} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          <EventList events={events} />    {/* pass the state to EventList as a prop of events */}
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => {getAccessToken()}} />
        </div>
      </div>
    );
  }
}

export default App;