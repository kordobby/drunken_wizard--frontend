import styled from "styled-components";
// css
import flex from "../GlobalStyled/flex";

export const StWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  z-index: -5;
`;

// Header
export const Header = styled.header`
  width: 100vw;
  min-width: 70vw;
  height: 150px;
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${flex({ align: "center", justify: "space-between" })}/* img {
    width: 100%;
    height: 150px;
    object-fit: contain;
  } */
`;
export const LogoutBtn = styled.button`
  border: none;
  background-color: transparent;
  margin-left: 50px;
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    /* box-shadow: 0px 0px 10px 2px #fd6f33; */
  }
`;

export const UserInfo = styled.div`
  margin: 0;
  margin-right: 220px;
  ${flex({ direction: "column" })};
`;
export const NickName = styled.span`
  border: none;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 1000;
  color: white;
`;
export const Record = styled.span`
  font-size: 15px;
  font-weight: 1000;
  color: white;
`;

// lobby
export const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${flex({ align: "center", justify: "center" })}
  position: absolute;
`;

export const CreatRoomBox = styled.div`
  width: 600px;
  height: 300px;
  ${flex({ direction: "column", align: "center" })};
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(1px);
  z-index: 9999;
`;

// chat
