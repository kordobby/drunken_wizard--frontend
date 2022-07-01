// package
import React, { Dispatch, SetStateAction, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
// hooks
import useInput from "../hooks/useInput";
import { passwordCheckF } from "../hooks/useCheck";
// kakao
import { KAKAO_AUTH_URL } from "../shared/Kakao";
// cookies
import { setCookie } from "../shared/Cookies";
import { LogUser } from "../typings/db";

const loginMT = (data: LogUser) => {
  return axios.post("http://3.35.214.100/login", data);
};

interface loginStateProps {
  setLoginState: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setLoginState }: loginStateProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useInput("");
  const [password, setPassword] = useInput("");

  // mutate
  const { mutate } = useMutation(loginMT, {
    onSuccess: (res) => {
      console.log(res);
      let idData = JSON.parse(res.config.data);
      setCookie("token", res.headers.authorization, {
        path: "/",
        expire: "after60m",
      });
      setCookie("username", idData.username, {
        path: "/",
        expire: "after60m",
      });
      setCookie("nickname", res.data.nickname, {
        path: "/",
        expire: "after60m",
      });
      navigate("/");
      setLoginState(true);
    },
    onError: (error) => {
      navigate("/login");
      setLoginState(false);
    },
  });

  // submit
  const handleLogin = useCallback(
    (e: any) => {
      e.preventDefault();
      mutate({ username, password });
    },
    [username, password]
  );

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label id="user-id-label">
          <span>아이디</span>
          <div>
            <input
              type="text"
              id="user-id"
              name="user-id"
              value={username}
              onChange={setUsername}
              placeholder="로그인 시 사용할 ID를 입력해주세요."
            />
            {username === "" ? (
              <span>ID를 입력 해주세요.</span>
            ) : (
              <span>올바른 형식의 ID입니다.</span>
            )}
          </div>
        </label>
        <label id="password-label">
          <span>비밀번호</span>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={setPassword}
              placeholder="비밀번호를 입력해주세요."
            />
            {passwordCheckF(password) ? (
              <span>올바른 형식의 비밀번호 입니다.</span>
            ) : (
              <span>영문, 숫자, 특수 문자 포함 6~15자</span>
            )}
          </div>
        </label>
        <button
          type="submit"
          disabled={username === "" || password === "" ? true : false}
        >
          로그인
        </button>
      </form>
      <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
      <Link to="/signup">
        <button>회원가입하기</button>
      </Link>
    </div>
  );
};

export default Login;
