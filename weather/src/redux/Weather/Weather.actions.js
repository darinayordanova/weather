import types from "./Weather.types";
import moment from "moment";
import * as api from "../../Services/WeatherService";

export const changeWeather = (obj) => ({
  type: types.CHANGE_WEATHER,
  payload: obj,
});

export const changeMetric = (item) => ({
  type: types.CHANGE_METRIC,
  payload: item,
});

export const getWeatherByCity = (name, metric) => async (dispatch) => {
  try {
    const { data } = await api.getWeatherByCityName(name, metric);
    console.log(data);
    dispatch({ type: types.CHANGE_WEATHER, payload: manageData(data) });
  } catch (error) {
    console.log(error.message);
  }
};

export const getWeatherByGeolocation = (lat, lon, metric) => async (dispatch) => {
  try {
    const { data } = await api.getWeatherByGeo(lat, lon, metric);
    console.log(data);
    dispatch({ type: types.CHANGE_WEATHER, payload: manageData(data) });
  } catch (error) {
    console.log(error.message);
  }
};

//Transform the JSON obj to an easier to use obj
function manageData(obj) {
  let finalObject = {
    cityName: obj.city.name,
    country: obj.city.country,
    now: {
      time: moment(obj.list[0].dt_txt).format("H:mm"),
      temperature: Math.round(obj.list[0].main.temp),
      feelsLike: Math.round(obj.list[0].main.feels_like),
      weather: obj.list[0].weather[0].description,
      icon: obj.list[0].weather[0].icon,
      humidity: obj.list[0].main.humidity,
      wind: Math.round(obj.list[0].wind.speed),
    },
  };
  var newobj = {};
  var descriptions = {};
  var icons = {};

  obj.list.map((item) => {
    let simleItem = {
      //Get rid of unnecessary info
      time: moment(item.dt_txt).format("H:mm"),
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      weather: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      wind: Math.round(item.wind.speed),
    };

    let localArr = newobj[item.dt_txt.split(" ")[0]]?.detailed
      ? newobj[item.dt_txt.split(" ")[0]].detailed
      : [];
    let localDescriptions = descriptions[item.dt_txt.split(" ")[0]]
      ? descriptions[item.dt_txt.split(" ")[0]]
      : [];
    let localIcons = icons[item.dt_txt.split(" ")[0]]
      ? icons[item.dt_txt.split(" ")[0]]
      : [];

    localArr.push(simleItem);
    localDescriptions.push(simleItem.weather);
    localIcons.push(simleItem.icon);

    newobj[item.dt_txt.split(" ")[0]] = {
      ...newobj[item.dt_txt.split(" ")[0]],
      date: moment(item.dt_txt).format("DD.MM"),
      weekDay: moment(item.dt_txt).format("dddd"),
      maxTemp:
        newobj[item.dt_txt.split(" ")[0]]?.maxTemp < item.main.temp_max ||
        !newobj[item.dt_txt.split(" ")[0]]?.maxTemp
          ? Math.round(item.main.temp_max)
          : newobj[item.dt_txt.split(" ")[0]].maxTemp,
      minTemp:
        newobj[item.dt_txt.split(" ")[0]]?.minTemp > item.main.temp_min ||
        !newobj[item.dt_txt.split(" ")[0]]?.minTemp
          ? Math.round(item.main.temp_min)
          : newobj[item.dt_txt.split(" ")[0]].minTemp,
      detailed: localArr,
    };

    descriptions[item.dt_txt.split(" ")[0]] = localDescriptions;

    icons[item.dt_txt.split(" ")[0]] = localIcons;
  });

  Object.entries(descriptions).map((val) => {
    var map = val[1].reduce(function (map, item) {
      if (!(item in map)) map[item] = 0;
      return map[item]++, map;
    }, {});
    var max = Math.max.apply(null, Object.values(map)),
      arr2 = [];
    Object.keys(map).forEach(function (k) {
      if (map[k] === max) arr2.push(k);
    });
    newobj[val[0]] = {
      ...newobj[val[0]],
      desc: arr2[0],
    };
  });
  Object.entries(icons).map((val) => {
    var map = val[1].reduce(function (map, item) {
      if (!(item in map)) map[item] = 0;
      return map[item]++, map;
    }, {});
    var max = Math.max.apply(null, Object.values(map)),
      arr2 = [];
    Object.keys(map).forEach(function (k) {
      if (map[k] === max) arr2.push(k);
    });
    newobj[val[0]] = {
      ...newobj[val[0]],
      icon: arr2[0],
    };
  });

  finalObject = { ...finalObject, forecast: newobj };
  return finalObject;
}
