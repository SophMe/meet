import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test("event element is collapsed by default", () => {
    expect(EventWrapper.state("isCollapsed")).toBe(true);
    });

  test('clicking details button toggles event details', () => {
    const detailsButton = EventWrapper.find('.details-btn');
    detailsButton.simulate('click');
    expect(EventWrapper.state('isCollapsed')).toBe(false);
    detailsButton.simulate('click');
    expect(EventWrapper.state('isCollapsed')).toBe(true);
  });

  test("render the title", () => {
    expect(EventWrapper.find(".title")).toHaveLength(1);
    expect(EventWrapper.find(".title").text()).toBe(event.summary);
  });

  test("render starting time", () => {
    expect(EventWrapper.find(".startTime")).toHaveLength(1);
    expect(EventWrapper.find(".startTime").text()).toBe(event.start.dateTime);
  });

  test("render the location", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
    expect(EventWrapper.find(".location").text()).toBe(event.location);
  });

})

