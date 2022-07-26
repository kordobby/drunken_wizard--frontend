import styled, { css } from "styled-components";
import { deleteCookie } from "../shared/Cookies";
import { useNavigate } from "react-router-dom";
import { ModalType } from "../typings/db";
const LogoutBtn = ({ modalHandler }: ModalType) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("id");
    deleteCookie("username");
    deleteCookie("nickname");
    alert("로그아웃 되었습니다!");
    navigate("/login");
  };

  return (
    <LogoutBtnSt onClick={modalHandler}>
      <span className="logout__text">Logout</span>
    </LogoutBtnSt>
  );
};

const LogoutBtnSt = styled.button`
  width: 12.7vw;
  height: 6.85vh;
  background-color: #564d4d;
  color: var(--white);
  font-size: 3.33vh;
  border-radius: 0.55vh;
  border: none;
  font-family: "국립박물관문화재단클래식B";
  box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 2.34vw;
  .logout__text {
    background-color: #ffffff;
    color: transparent;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    /* box-shadow: 0px 0px 10px 2px #fd6f33; */
  }
`;

export default LogoutBtn;
