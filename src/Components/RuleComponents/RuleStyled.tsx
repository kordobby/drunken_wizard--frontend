import styled from "styled-components";
import flex from "../GlobalStyled/flex";

export const Page = styled.img`
  width: 38.54vw;
  height: 79.62vh;
  box-shadow: 5px 5px 5px 5px #151515;
`;

export const BookMarkImg = styled.img`
  width: 4.11vw;
  height: 13.7vh;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flex({ align: "center", justify: "center" })}
  position: absolute;
  top: 0;
`;

export const RuleWrap = styled.div`
  width: 84.375vw;
  height: 49.6875vw;
  z-index: 10000;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  ${flex({ align: "center", justify: "center" })}
`;
export const RuleBox = styled.div`
  width: 77.08vw;
  height: 44.79vw;
  position: relative;
  z-index: 10000;
`;

export const CloseButton = styled.button`
  position: fixed;
  top: 9vh;
  right: 13vw;
  border: none;
  ${flex({ justify: "stretch" })};

  background-color: transparent;
  z-index: 10001;
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
  }
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(1px);
  z-index: 900;
`;
export const Button = styled.button`
  width: 211px;
  height: 83px;
  border: none;
  margin-right: 16px;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }
`;
