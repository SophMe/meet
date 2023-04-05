import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = { eventCount: 32 }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ eventCount: value });
    this.props.updateEventCount(event);
  }

  render() {
    return (
      <div className="eventCount">
        <input 
          type="number"
          className="number"
          value={this.state.eventCount}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;