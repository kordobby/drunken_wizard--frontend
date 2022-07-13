import styled from "styled-components";
import flex from "../GlobalStyled/flex";

export const Page = styled.img`
  box-shadow: 5px 5px 5px 5px #151515;
`;

export const BackWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1000;
`;
export const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flex({ align: "center", justify: "center" })}
  position: absolute;
  top: 0;
`;

export const RuleBox = styled.div`
  width: 1120px;
  height: 1300px;
  ${flex({ direction: "column", align: "center", justify: "center" })};
  z-index: 10000;
`;

export const Button = styled.button`
  width: 211px;
  height: 83px;
  border: none;
  margin-right: 16px;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
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
