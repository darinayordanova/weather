import { combineReducers } from 'redux';
import Weather from './Weather/Weather.reducer';

// Thats unnecessary for now, but if we want to add more features in the future
export default combineReducers({
    Weather: Weather
})