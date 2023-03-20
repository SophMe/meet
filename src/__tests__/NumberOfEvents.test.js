import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
  });

  test("default number of events is 32", () => {
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(32);
  });

  test("render input for number of events", () => {
    expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
    expect(NumberOfEventsWrapper.find(".number").prop("type")).toBe("number");
  });

  test("change state when input value changes", () => {
    NumberOfEventsWrapper.find(".number").simulate("change", {
      target: { value: 24 },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(24);
  });
})