import styled, { css } from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  width: 50%;
  background: #E7E1E0;
  position: absolute;
  right: 0;
  @media screen and (max-width: 1300px) {
    width: 60%;
  }
  @media screen and (max-width: 1030px) {
    width: 100%;
    display: block;
    position: relative;
    padding: 15px
  }
`;
export default function RightContainer({ children }) {
  return <Container>{children}</Container>;
}