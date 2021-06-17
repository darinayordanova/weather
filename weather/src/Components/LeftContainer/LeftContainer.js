import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  background-size: cover;
  background-position: center;
  width: 50%;
  background-image: url(./BG-clouds.png);
  position: fixed;
  @media screen and (max-width: 1300px) {
    width: 40%;
  }
  @media screen and (max-width: 1030px) {
    width: 100%;
    display: block;
    position: relative;
  min-height: auto;
  padding: 30px 15px

  }
`;
export default function LeftContainer({ children }) {
  return <Container>{children}</Container>;
}