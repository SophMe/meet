import React from "react";
import { shallow } from "enzyme";
import EventList from "../EventList";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<EventList /> component", () => {
  test("render correct number of events", () => {
    const eventCount = 2;
    const EventListWrapper = shallow(<EventList events={mockData} eventCount={eventCount}/>);
    expect(EventListWrapper.find(Event)).toHaveLength(eventCount);
  });
});