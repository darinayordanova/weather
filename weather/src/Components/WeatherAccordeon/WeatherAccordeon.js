import React, { useState} from "react";
import styled, { css } from "styled-components";
import WeatherDetailed from "../WeatherDetailed/WeatherDetailed";
import { useSelector } from "react-redux";
const mapState = ({ Weather }) => {
  return {
    weather: Weather,
  };
};

const Row = styled.div`
  border-bottom: 1px solid #48484a;
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ContainerWidth = styled.div`
  width: calc(100% / 3);
  text-align: ${(props) => (props.align ? props.align : "left")};
`;
const SimpleCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 60px);
`;

const InnerCont = styled.div`
  display: flex;
  align-items: center;
`;
const SimpleText = styled.p`
  color: #48484a;
  font-size: 18px;
  margin: 0;
`;
const SimpleTextWeather = styled.p`
  color: #48484a;
  font-size: 18px;
  margin: 0;
  @media screen and (max-width: 400px) {
    display: none
  }
`;

const Date = styled.p`
  color: #48484a;
  font-size: 14px;
  margin: 0;
`;

const Img = styled.div`
  width: 60px;
  height: 60px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(http://openweathermap.org/img/wn/${(props) =>
    props.src}@2x.png);
`;

const Arrow = styled.div`
  width: 20px;
  background-position: center;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  background-image: url(./arrow.svg);
  transform: rotateZ(${(props) => (props.rotate ? "180deg" : "0")});
`;

const DetailsContainer = styled.div`
  padding: 15px;
`;

const Celsius = styled.sup`
  font-size: 14px;
  margin: 10px 0;
  font-weight: 400;
  color: #48484a
`;
export default function WeatherAccordeon({ forecastArray }) {
  const { weather } = useSelector(mapState);
  const [currentlyOpen, setCurrentlyOpen] = useState();
  return (
    <>
      {forecastArray?.map((item) => {
        return (
          <>
            <Row>
              <SimpleCont>
                <ContainerWidth>
                  <SimpleText>{item?.weekDay}</SimpleText>
                  <Date>{item?.date}</Date>
                </ContainerWidth>
                <ContainerWidth>
                  <InnerCont>
                    <Img src={item?.icon} />
                    <SimpleTextWeather>{item?.desc}</SimpleTextWeather>
                  </InnerCont>
                </ContainerWidth>
                <ContainerWidth align="right">
                  <SimpleText>{item?.minTemp}<Celsius>{weather.metricUnit=='metric'? '°C' : '°F'}</Celsius>/{item?.maxTemp}<Celsius>{weather.metricUnit=='metric'? '°C' : '°F'}</Celsius></SimpleText>
                </ContainerWidth>
              </SimpleCont>
              <Arrow
                onClick={() =>
                  currentlyOpen == item.date
                    ? setCurrentlyOpen("")
                    : setCurrentlyOpen(item?.date)
                }
                rotate={currentlyOpen == item.date}
              />
            </Row>

            {currentlyOpen == item.date ? (
              <DetailsContainer>
                <WeatherDetailed detailsArray={item?.detailed} />
              </DetailsContainer>
            ) : null}
          </>
        );
      })}
    </>
  );
}
