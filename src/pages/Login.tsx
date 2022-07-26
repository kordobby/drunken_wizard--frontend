// package
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import useSound from "use-sound";
// hooks
import useInput from "../hooks/useInput";
import { passwordCheckF } from "../hooks/useCheck";
import { useFocus } from "../hooks/useFocus";
// cookies
import { setCookie } from "../shared/Cookies";
// kakao
import { KAKAO_AUTH_URL } from "../shared/Kakao";
// interface
import { loginStateProps } from "../typings/db";
// apis
import apis from "../shared/api/apis";
// css
import {
  BackWrap,
  LogLogo,
  Input,
  InputBoxId,
  InputBoxPw,
  SpeechBubble,
  LoginBtnBox,
} from "../Components/UserComponents/UserStyled";
import { DefaultBtn, FormWrapSt } from "../Components/Common/CommonStyle";

// sounds
import btnSound from "../sounds/buttonSound.mp3";

const Login = ({ setLoginState }: loginStateProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useInput<string>("");
  const [password, setPassword] = useInput<string>("");
  const [idFocus, setIdFocus] = useFocus<boolean>(false);
  const [pwFocus, setPwFocus] = useFocus<boolean>(false);
  const [play] = useSound(btnSound);

  // mutate
  const { mutate } = useMutation(apis.loginMT, {
    onSuccess: (res) => {
      setCookie("token", res.headers.authorization, {
        path: "/",
        expire: "after60m",
      });
      setCookie("id", res.data.id, {
        path: "/",
        expire: "after60m",
      });
      setCookie("username", res.data.username, {
        path: "/",
        expire: "after60m",
      });
      setCookie("nickname", res.data.nickname, {
        path: "/",
        expire: "after60m",
      });
      navigate("/lobby");
      setLoginState(true);
    },
    onError: (error) => {
      navigate("/login");
      setLoginState(false);
      console.log(error);
    },
  });

  // submit
  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      mutate({ username, password });
    },
    [username, password, mutate]
  );

  return (
    <BackWrap>
      <FormWrapSt>
        <LogLogo top={5.729} bottom={4.6875} />
        {/* <LogLogo src={logo} /> */}
        <form>
          <label id="user-id-label">
            <InputBoxId>
              <Input
                type="text"
                id="user-id"
                name="user-id"
                value={username}
                onChange={setUsername}
                placeholder="ID"
                onFocus={setIdFocus}
                onBlur={setIdFocus}
              />
              {username === "" && idFocus && (
                <SpeechBubble>
                  <span className="bubble__notice">
                    아이디를 <br />
                    입력해주세요.
                  </span>
                </SpeechBubble>
              )}
              {username !== "" && idFocus && (
                <SpeechBubble>
                  <span className="bubble__notice">
                    올바른 형식의 <br />
                    ID 입니다.
                  </span>
                </SpeechBubble>
              )}
            </InputBoxId>
          </label>
          <label id="password-label">
            <InputBoxPw>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={setPassword}
                onFocus={setPwFocus}
                onBlur={setPwFocus}
              />
              {passwordCheckF(password) && pwFocus && (
                <SpeechBubble>
                  <span className="bubble__notice">
                    올바른 형식의 <br />
                    비밀번호 입니다.
                  </span>
                </SpeechBubble>
              )}
              {!passwordCheckF(password) && pwFocus && (
                <SpeechBubble>
                  <span className="bubble__notice">
                    영문, 숫자, <br /> 특수문자 포함 <br />
                    6~15자
                  </span>
                </SpeechBubble>
              )}
            </InputBoxPw>
          </label>
        </form>
        <LoginBtnBox>
          <DefaultBtn
            btnType="activeM"
            size={10.9895}
            onClick={(e) => {
              play();
              handleLogin(e);
            }}
            type="submit"
            disabled={username === "" || password === "" ? true : false}
          >
            <span>Login</span>
          </DefaultBtn>
          <Link to="/signup">
            <DefaultBtn
              btnType="inactiveM"
              size={10.9895}
              onClick={() => {
                play();
              }}
            >
              <span>Register</span>
            </DefaultBtn>
          </Link>
        </LoginBtnBox>
        <a href={KAKAO_AUTH_URL}>
          <DefaultBtn
            btnType="kakao"
            size={22.8125}
            onClick={() => {
              play();
            }}
            style={{ marginBottom: "2.77vw" }}
          ></DefaultBtn>
        </a>
      </FormWrapSt>
    </BackWrap>
  );
};

export default Login;
