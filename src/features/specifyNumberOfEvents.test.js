import React from "react";
import { mount } from "enzyme";
import App from "../App";
import { loadFeature, defineFeature } from "jest-cucumber";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
let AppWrapper;

defineFeature(feature, test => {
  test('User hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('the user hasn\'t specified the number of events to display', () => {
    });
    when('the list of events is loaded', () => {
      AppWrapper = mount(<App />);
    });
    then('the default number of events displayed is 32', () => {
      expect(AppWrapper.state('eventCount')).toBe(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let NumberOfEventsWrapper
    given('the list of events is open', async () => {
      AppWrapper = await mount(<App />);
      NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
    });
    when('the user changes the number of events to display', () => {
      AppWrapper.update();
      const eventObject = {target: {value: 4}};
      NumberOfEventsWrapper.find('.number').simulate('change', eventObject);
    });
    then('the number of events displayed changes accordingly', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(4);
      expect(NumberOfEventsWrapper.state('eventCount')).toBe(4);
    });  
  });

});

