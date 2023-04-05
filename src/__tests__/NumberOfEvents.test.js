import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  let eventCount = 32;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents eventCount={eventCount} updateEventCount={() => {}}/>);
  });

  test("default number of events is 32", () => {
    expect(NumberOfEventsWrapper.state("eventCount")).toBe(32);
  });

  test("render input for number of events", () => {
    expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
    expect(NumberOfEventsWrapper.find(".number").prop("type")).toBe("number");
  });

  test("change number of events shown when input value changes", () => {
    const eventCount = {target: { value: 2 }};
    NumberOfEventsWrapper.find(".number").simulate("change", eventCount);
    expect(NumberOfEventsWrapper.state("eventCount")).toBe(2);
  });
})