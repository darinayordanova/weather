import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import {
  LeftContainer,
  RightContainer,
  Search,
  City,
  WeatherNow,
  WeatherAccordeon,
} from "./Components";
import {
  getWeatherByCity,
  getWeatherByGeolocation,
  changeMetric,
} from "./redux/Weather/Weather.actions";

const MainContainer = styled.div`
  display: flex;
  @media screen and (max-width: 1030px) {
    display: block;
  }
`;
const GlobalStyle = createGlobalStyle`
  *{
    font-family: 'Raleway', sans-serif;
    color: #48484A;
  }
  body::-webkit-scrollbar {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 360px) {
    display: block;
  }
`;
const Units = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #e7e1e0;
  @media screen and (max-width: 360px) {
    margin-top: 15px
  }
`;
const Unit = styled.button`
  background: none;
  border: none;
  color: #e7e1e0;
  font-size: 20px;
  cursor: pointer;
`;
const mapState = ({ Weather }) => {
  return {
    weather: Weather,
  };
};
function App() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { weather } = useSelector(mapState);
  useEffect(() => {
    dispatch(getWeatherByCity("London", weather.metricUnit));
    navigator.geolocation?.getCurrentPosition(getPosition);
  }, []);
  function getPosition(pos) {
    dispatch(
      getWeatherByGeolocation(
        pos.coords.latitude,
        pos.coords.longitude,
        weather.metricUnit
      )
    );
  }
  function SearchCity() {
    dispatch(getWeatherByCity(search, weather.metricUnit));
    setSearch("");
  }

  function ChangeMetric(unit) {
    dispatch(changeMetric(unit));
    dispatch(getWeatherByCity(weather.cityName, unit));
  }
  return (
    <MainContainer>
      <GlobalStyle />
      <LeftContainer>
        <Row>
          <Search
            placeholder="Search city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={SearchCity}
            onKeyDown={(e) => (e.key === "Enter" ? SearchCity() : null)}
          />
          <Units>
            <Unit
              style={
                weather.metricUnit == "metric"
                  ? {
                      color: "#ec6e4c",
                      fontWeight: "700",
                    }
                  : {}
              }
              onClick={(e) => {
                if (weather.metricUnit !== "metric") {
                  ChangeMetric("metric");
                }
              }}
            >
              °C
            </Unit>
            /
            <Unit
              style={
                weather.metricUnit == "imperial"
                  ? {
                      color: "#ec6e4c",
                      fontWeight: "700",
                    }
                  : {}
              }
              onClick={(e) => {
                if (weather.metricUnit !== "imperial") {
                  ChangeMetric("imperial");
                }
              }}
            >
              °F
            </Unit>
          </Units>
        </Row>
        <City>
          {weather?.cityName}, {weather?.country}
        </City>
      </LeftContainer>
      <RightContainer>
        <WeatherNow />
        <WeatherAccordeon
          forecastArray={
            weather?.forecast
              ? Object.values(weather?.forecast)?.slice(
                  1,
                  Object.values(weather?.forecast)?.length
                )
              : null
          }
        />
      </RightContainer>
    </MainContainer>
  );
}

export default App;
