import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32 // || this.props.numberOfEvents
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ numberOfEvents: value });
    this.props.updateEvents(null, value);
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input 
          type="number"
          className="number"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;