import React, { useEffect, useState, memo, useMemo } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
const mapState = ({ Weather }) => {
  return {
    weather: Weather,
  };
};
const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  @media screen and (max-width: 660px) {
    overflow-x: auto;
    justify-content: start;
  }
`;

const Img = styled.div`
  width: 35px;
  height: 35px;
  background-size: contain;
  margin: 0 auto;
  background-image: url(http://openweathermap.org/img/wn/${(props) =>
    props.src}@2x.png);
`;
const TitleRow = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 400;
  margin: 5px 0;

  text-align: right;
  color: #818189;
  line-height: 20px;
`;

const Celsius = styled.sup`
  font-size: 14px;
  margin: 10px 0;
  font-weight: 400;
  color: #48484a;
`;

const PlainText = styled.p`
  font-size: 18px;
  margin: 5px 0;
  font-weight: 400;
  text-align: center;
  color: #48484a;
`;
const PlainTextDescription = styled.p`
  max-width: 65px;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
  text-align: center;
  min-height: 32px;
  color: #48484a;
  
`;
const SingleCont = styled.div`
  border-right: 1px solid #48484a;
  padding: 0 9px;
`;

export default function WeatherDetailed({ detailsArray }) {
  const { weather } = useSelector(mapState);
  return (
    <Container>
      <div>
        <TitleRow>Feels like</TitleRow>
        <TitleRow>Wind</TitleRow>
        <TitleRow>Humidity</TitleRow>
      </div>
      {detailsArray?.map((item) => {
        return (
          <SingleCont>
            <PlainText>{item?.time}</PlainText>
            <Img src={item?.icon} />
            <PlainTextDescription>{item?.weather}</PlainTextDescription>
            <PlainText>
              {item?.temperature}
              <Celsius>{weather.metricUnit=='metric'? '°C' : '°F'}</Celsius>
            </PlainText>
            <PlainText>
              {item?.feelsLike}
              <Celsius>{weather.metricUnit=='metric'? '°C' : '°F'}</Celsius>
            </PlainText>
            <PlainText>{item?.wind}m/s</PlainText>
            <PlainText>{item?.humidity}%</PlainText>
          </SingleCont>
        );
      })}
    </Container>
  );
}