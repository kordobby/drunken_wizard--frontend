// package
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
// hooks
import useInput from "../hooks/useInput";
import { passwordCheckF } from "../hooks/useCheck";
import { useFocusHandler } from "../hooks/focus";
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
  Button,
  RegiImg,
  KakaoImg,
  SpeechBubble,
  SpeechSpan,
} from "../Components/UserComponents/UserStyled";
// svgs
import logBack from "../images/background/loginBackground.svg";
import logBtn from "../images/buttons/BTN_login.svg";
import regBtn from "../images/buttons/BTN_register.svg";
import kakaoBtn from "../images/buttons/BTN_kakao.svg";
import logo from "../images/logo/logo.svg";
import speechBubble from "../images/imgs/SpeechBubble.svg";

const Login = ({ setLoginState }: loginStateProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useInput<string>("");
  const [password, setPassword] = useInput<string>("");
  const [idFocus, setIdFocus] = useFocusHandler<boolean>(false);
  const [pwFocus, setPwFocus] = useFocusHandler<boolean>(false);

  // mutate
  const { mutate } = useMutation(apis.loginMT, {
    onSuccess: (res) => {
      // console.log(res);
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
    <BackWrap style={{ backgroundImage: `url(${logBack})` }}>
      <LogLogo src={logo} />
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
              <SpeechBubble style={{ backgroundImage: `url(${speechBubble})` }}>
                <SpeechSpan>ID를 입력 해주세요.</SpeechSpan>
              </SpeechBubble>
            )}
            {username !== "" && idFocus && (
              <SpeechBubble style={{ backgroundImage: `url(${speechBubble})` }}>
                <SpeechSpan>올바른 형식의 ID입니다.</SpeechSpan>
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
              <SpeechBubble style={{ backgroundImage: `url(${speechBubble})` }}>
                <SpeechSpan>올바른 형식의 비밀번호 입니다.</SpeechSpan>
              </SpeechBubble>
            )}
            {!passwordCheckF(password) && pwFocus && (
              <SpeechBubble style={{ backgroundImage: `url(${speechBubble})` }}>
                <SpeechSpan>영문, 숫자, 특수 문자 포함 6~15자</SpeechSpan>
              </SpeechBubble>
            )}
          </InputBoxPw>
        </label>
      </form>
      <div>
        <Button
          onClick={handleLogin}
          type="submit"
          disabled={username === "" || password === "" ? true : false}
          style={{ backgroundImage: `url(${logBtn})` }}
        ></Button>
        <Link to="/signup">
          <RegiImg src={regBtn} />
        </Link>
      </div>

      <a href={KAKAO_AUTH_URL}>
        <KakaoImg src={kakaoBtn} />
      </a>
    </BackWrap>
  );
};

export default Login;
