import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    eventCount: 32,
    errorText: ''
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({ errorText: 'Please enter a number between 1 and 32'})
    } else {
      this.setState({ eventCount: value, errorText: '' });
      this.props.updateEventCount(event);
    }
  }

  render() {
    return (
      <div className="eventCount">
        <ErrorAlert text={this.state.errorText} />
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