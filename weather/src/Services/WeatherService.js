import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/forecast?";
const APIKey = "&appid=db821b59a89db53c9bb01b36ff26eac3";
const additionalSettings = "&units=";

export const getWeatherByCityName = (name, metric) =>
  axios.get(baseURL + "q=" + name + additionalSettings + metric + APIKey);

export const getWeatherByGeo = (lat, lon, metric) =>
  axios.get(baseURL + "lat=" + lat + "&lon=" + lon + additionalSettings + metric  + APIKey);