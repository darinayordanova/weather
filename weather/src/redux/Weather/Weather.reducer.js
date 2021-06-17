import types from "./Weather.types";

const INITIAL_STATE = {
  cityName: "London",
  metricUnit: 'metric',
  weather: {},
};

const WeatherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_WEATHER:
      return {
        ...state,
        ...action.payload,
      };
      case types.CHANGE_METRIC:
      return {
        ...state,
        metricUnit: action.payload,

      };
    default:
      return state;
  }
};

export default WeatherReducer;
