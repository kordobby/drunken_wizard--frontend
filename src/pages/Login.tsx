// package
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
// hooks
import useInput from "../hooks/useInput";
import { passwordCheckF } from "../hooks/useCheck";
// cookies
import { setCookie } from "../shared/Cookies";
// kakao
import { KAKAO_AUTH_URL } from "../shared/Kakao";
// interface
import { loginStateProps } from "../typings/db";
// apis
import apis from "../shared/api/apis";

const Login = ({ setLoginState }: loginStateProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useInput<string>("");
  const [password, setPassword] = useInput<string>("");

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
    },
  });

  // submit
  const handleLogin = useCallback(
    (e: any) => {
      e.preventDefault();
      mutate({ username, password });
    },
    [username, password, mutate]
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
