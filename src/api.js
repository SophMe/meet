// This file makes event locations availabe to CitySearch

import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");     // try to retrieve access token
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        `https://ddjy3ni397.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url`
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
)
    .then((res) => res.json())
    .catch((error) => error.json());
  return result;
};

export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
   return mockData;
  }

  // check whether app is offline via navigator.onLine API
  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data?JSON.parse(data).events: [];
  }

  const token = await getAccessToken();
  if (token) {
    removeQuery();
    // if there is a token we get events
    const url = `https://ddjy3ni397.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));  // create key lastEvents to store that data and load it later
      localStorage.setItem("locations", JSON.stringify(locations));     // localStorage can only store strings
    }
    NProgress.done();
    return result.data.events;
  }
};

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// if there is no valid token, user will be redirected to log in with Google
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    `https://ddjy3ni397.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};