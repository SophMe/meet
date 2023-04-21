import React, { Component } from "react";

class Event extends Component {
  state = {
    isCollapsed: true
  }

  toggleDetails = () => {
    this.setState(prevState => (
      {isCollapsed: !prevState.isCollapsed}
    ))
  }

  render() {
    const {event} = this.props
    const {isCollapsed} = this.state
    return (
      <div className="Event">
        <h4 className="title">{event.summary}</h4>
        <p className="startTime">{event.start.dateTime}</p>
        <p className="location">{event.location}</p>
        <button className="details-btn" onClick={this.toggleDetails}>
          {isCollapsed ? "Show" : "Hide"} details
        </button>
        {!isCollapsed && (
          <div className="details">
            <p className="description">{event.description}</p>
            <a href="{event.htmlLink}" className="link">link</a>
            <p className="status">{event.status}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Event;