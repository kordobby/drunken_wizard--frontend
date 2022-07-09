import styled from "styled-components";
import flex from "../GlobalStyled/flex";

export const StWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  z-index: -5;
`;

export const BackWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
