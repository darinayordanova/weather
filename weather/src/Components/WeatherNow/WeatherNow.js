import React, { useEffect, useState, memo, useMemo } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import WeatherDetailed from "../WeatherDetailed/WeatherDetailed";
const mapState = ({ Weather }) => {
  return {
    weather: Weather,
  };
};
const Container = styled.div`
  display: flex;
  margin-bottom: 70px;
  justify-content: space-between;
  @media screen and (max-width: 1300px) {
    display: block;
    text-align: center;
  }
`;
const ContainerTodayImg = styled.div`
  align-items: center;
  display: flex;
`;
const Img = styled.div`
  width: 100px;
  height: 100px;
  margin: -15px 0 -15px -15px;
  background-size: contain;
  background-image: url(http://openweathermap.org/img/wn/${(props) =>
    props.src}@2x.png);
`;
const Title = styled.h2`
  font-size: 42px;
  margin: 0;
  font-weight: 400;
`;
const Celsius = styled.sup`
  font-size: 32px;
  margin: 10px 0;
  font-weight: 400;
  color: #ec6e4c;
`;
const Now = styled.div`
  @media screen and (max-width: 1300px) {
    margin: 0 auto;
    display: inline-block;
    margin-bottom: 30px
  }
`;
const Degr = styled.h2`
  font-size: 62px;
  margin: 0;
  font-weight: 400;
  color: #ec6e4c;
`;

const WeatherDetails = styled.p`
  font-size: 24px;
  margin: 0;
  font-weight: 400;
  max-width: 150px;
  @media screen and (max-width: 1300px) {
    max-width: 100%;
  }
`;

export default function WeatherNow() {
  const { weather } = useSelector(mapState);

  return (
    <Container>
      <Now>
        <Title>Now</Title>
        <ContainerTodayImg>
          <Img src={weather?.now?.icon} />
          <Degr>
            {weather?.now?.temperature}
            <Celsius>{weather.metricUnit == "metric" ? "°C" : "°F"}</Celsius>
          </Degr>
        </ContainerTodayImg>
        <WeatherDetails>{weather?.now?.weather}</WeatherDetails>
      </Now>
      <WeatherDetailed
        detailsArray={
          weather?.forecast
            ? [
                ...Object.values(weather?.forecast)[0]?.detailed,
                ...Object.values(weather?.forecast)[1]?.detailed,
              ].slice(1, 7)
            : null
        }
      />
    </Container>
  );
}
