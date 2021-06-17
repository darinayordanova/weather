import styled from "styled-components";

const Title = styled.h1`
  color: #E7E1E0;
  position: absolute;
  bottom: 30px;
  margin: 0;
  font-size: 72px;
  font-weight: 400;
  @media screen and (max-width: 1030px) {
    bottom: 0;
    position: relative;
    margin-top: 15px;
  font-size: 48px;

  }
`;

export default function CityTitle({ children }) {
  return <Title>{children}</Title>;
}