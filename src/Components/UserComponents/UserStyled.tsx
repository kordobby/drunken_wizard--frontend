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
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1000;
`;
export const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center; ;
`;

export const LogLogo = styled.img`
  display: flex;
  margin: 50px 0 80px 0;
`;
export const SignLogo = styled.img`
  display: flex;
  margin: 50px 0 40px 0;
`;

export const InputBoxId = styled.div`
  display: flex;
  margin: 0 0 16px 0;
`;
export const InputBoxPw = styled.div`
  display: flex;
  margin-bottom: 70px;
`;

export const Input = styled.input`
  width: 420px;
  height: 56px;
  padding: 0px 20px;
  border-radius: 12px;
  border-color: transparent;
  outline: 1px solid #fd6f33;
  outline-offset: -1px;
  font-size: 24px;
  position: relative;
  &:focus {
    color: #fd6f33;
    outline: 1px solid #fd6f33;
    outline-offset: -1px;
    box-shadow: 0px 0px 10px 2px #fd6f33;
    text-shadow: 0px 0px 4px #ffffff, 0 0 0em blue, 0 0 0.1em #ffffff;
  }
  &:hover {
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

// signUp
export const IdCheckButton1 = styled.button`
  width: 90px;
  height: 60px;
  border: none;
  margin-bottom: 16px;
  background-color: #fd6f33;
  color: white;
  font-size: 18px;
  border-radius: 0 12px 12px 0;
  margin: 0 0 0 -90px;
  position: absolute;
  margin-right: 500px;
  outline: 1px solid #fd6f33;
  outline-offset: -1px;

  &:hover {
    outline: 1px solid #fd6f33;
    outline-offset: -1px;
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

export const IdCheckButton2 = styled.button`
  width: 90px;
  height: 60px;
  border: none;
  background-color: #9e9e9e;
  color: white;
  font-size: 18px;
  border-radius: 0 12px 12px 0;
  margin: 0 0 0 -90px;
  position: absolute;
  outline: 1px solid #fd6f33;
  outline-offset: -1px;

  &:hover {
    outline: 1px solid #fd6f33;
    outline-offset: -1px;
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
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
export const Button1 = styled.button`
  width: 211px;
  height: 83px;
  border: none;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
export const Button2 = styled.button`
  width: 438px;
  height: 83px;
  border: none;
  margin-top: 28px;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

export const SpeechBubble = styled.div`
  width: 236px;
  height: 130px;
  margin: 0 460px 0 480px;
  position: fixed;
`;

export const SpeechSpan = styled.div`
  width: 180px;
  margin: 20px 15px 20px 25px;
  padding: 20px;
  position: fixed;
  font-size: 18px;
`;

export const ButtonBox = styled.div`
  margin: 0;
`;

// 전체화면 전환
export const ResizeBtn = styled.button`
  border: none;
  background-color: transparent;
  position: fixed;
  top: 50px;
  right: 50px;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

// 룰북 바로가기
export const RuleBtn = styled.button`
  border: none;
  background-color: transparent;
  position: fixed;
  top: 50px;
  right: 120px;
  color: #fd6f33;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
