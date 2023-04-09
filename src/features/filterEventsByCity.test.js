import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature'); 

defineFeature(feature, test => {
  test('If user hasn\'t searched for a city, show upcoming events from all cities', ({ given, when, then }) => {
    given('the user hasn’t searched for any city', () => {
    });
      let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />); // rendering App code is what happens when user opens the app 
    });
    then('the user should see a list of all upcoming events', () => {
      AppWrapper.update(); 
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
      let CitySearchWrapper;
      let locations = extractLocations(mockData);
    given('the main page is open', () => {
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />);
    });
    when('the user starts typing in the city text box', () => {
      CitySearchWrapper.find('.city').simulate('change', {target: {value: 'Berlin'}});
    });
    then('the user should see a list of cities (suggestions) that match their search', () => {
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let AppWrapper;
    given('the user was typing the name of a city (i.e. Berlin) in the city text box', async () => { // async to allow App to properly load
      AppWrapper = await mount(<App />); // mount() because interaction with the child CitySearch is requiered
      AppWrapper.find('.city').simulate('change', {target: {value:'Berlin, Germany'}} );
    });
    and('the list of suggested cities is showing', () => {
      AppWrapper.update(); // update after receiving suggestions
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });
    when('the user selects a city from the list', () => {
      AppWrapper.find('.suggestions li').at(0).simulate('click');
    });
    then('their city should be set to that city (i.e. Berlin)', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
    });
    and('the user should see a list of events in that city', () => {
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
    });
  });

}); 