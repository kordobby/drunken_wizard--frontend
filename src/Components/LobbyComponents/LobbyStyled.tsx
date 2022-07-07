import styled from "styled-components";
// css
import flex from "../GlobalStyled/flex";

export const StWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  z-index: -5;
`;
