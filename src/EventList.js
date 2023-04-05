import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    const {events, eventCount} = this.props;
    const shownEvents = events.slice(0, eventCount);
    return (
      <ul className="eventList">
        {shownEvents.map(event => 
          <li key={event.id}>
            <Event event={event} eventCount={eventCount} />
          </li>
        )}
      </ul>
    );
  }
}

export default EventList;