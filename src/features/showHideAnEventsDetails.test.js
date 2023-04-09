import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature} from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
let AppWrapper;

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the list of events is open', () => {
    });
    when('the user views the events', () => {
      AppWrapper = mount(<App />);
    });
    then('each event element should be collapsed', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event .details')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the list of events is open', () => {
      AppWrapper = mount(<App />);
    });
    when('the user clicks on an event', () => {
      AppWrapper.update();
      AppWrapper.find('.event').at(0).find('.details-btn').simulate('click');
    });
    then('the event details should be displayed', () => {
      expect(AppWrapper.find('.event .details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the event details are displayed', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event').at(0).find('.details-btn').simulate('click');
      // expect(AppWrapper.find('.event .details')).toHaveLength(1);
    });
    when('the user clicks on the event again', () => {
      AppWrapper.update();
      AppWrapper.find('.event').at(0).find('.details-btn').simulate('click');
    });
    then('the event details should be hidden', () => {
      expect(AppWrapper.find('.event .details')).toHaveLength(0);
    });
  });

});