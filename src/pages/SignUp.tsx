// package
import React, { useCallback, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// interface
import { IUser } from "../typings/db";
// fetcher
import fetcher from "../utils/fetcher";
// hooks
import useInput from "../hooks/useInput";
import { idCheck, emailCheck, passwordCheckF } from "../hooks/useCheck";
// modules
import { useAppDispatch } from "../hooks/tsHooks";
import { AppDispatch } from "../redux/configStore";

const signUpMT = (data: IUser) => {
  return axios.post("http://3.35.214.100/user/signup", data);
};
const signUpIdCheckMT = (data: object) => {
  return axios.post("http://3.35.214.100/user/dubcheck", data);
};

const SignUp = () => {
  const [username, setUsername] = useInput("");
  const [nickname, setNicname] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpCheckId, setSignUpCheckId] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // id disable
  const idCheckDisabled = () => {
    if (!idCheck(username) === true) return true;
    if (username === "") return true;
    // 서버 리턴값 if (  === true ) return false;
    else return false;
  };

  // button disable
  const disabledHandler = () => {
    if (idCheck(username) === false) return true;
    else if (signUpCheckId === false) return true;
    else if (password !== passwordCheck) return true;
    else if (emailCheck(email) === false) return true;
    else if (passwordCheckF(password) === false) return true;
    else if (
      username === "" ||
      password === "" ||
      passwordCheck === "" ||
      nickname === "" ||
      email === ""
    )
      return true;
    else return false;
  };

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck, setPassword]
  );
  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password, setPasswordCheck]
  );

  // mutate
  const { mutate: signUpidCheck } = useMutation(signUpIdCheckMT, {
    onSuccess: (res) => {
      setSignUpCheckId(true);
      console.log(res);
    },
    onError: (error: string) => {
      setSignUpCheckId(false);
      console.log(error);
    },
  });

  const { mutate: signUp } = useMutation(signUpMT, {
    onSuccess: () => {
      setSignUpSuccess(true);
      navigate("/login");
    },
    onError: (error: string) => {
      navigate("/signup");
      setSignUpError(error);
    },
  });
  const onIdCheck = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      signUpidCheck({ username: username });
    },
    [username, signUpidCheck]
  );

  // submit
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!mismatchError) {
        signUp({
          username: username,
          nickname: nickname,
          email: email,
          password: password,
          passwordCheck: passwordCheck,
        });
      }
    },
    [username, nickname, email, password, passwordCheck, mismatchError, signUp]
  );

  return (
    <div>
      <div id="container">
        <form onSubmit={onSubmit}>
          <label id="user-id-label">
            <span>아이디</span>
            <button onClick={onIdCheck} disabled={idCheckDisabled()}>
              중복확인
            </button>
            <div>
              <input
                type="text"
                id="user-id"
                name="user-id"
                value={username}
                onChange={setUsername}
              />
              {idCheck(username) &&
              username !== "" &&
              signUpCheckId === true ? (
                <span>사용가능한 ID입니다.</span>
              ) : (
                <span>올바른 아이디 형식이 아닙니다.</span>
              )}
            </div>
          </label>
          <label id="nickname-label">
            <span>닉네임</span>
            <div>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={setNicname}
              />
              {!nickname ? (
                <span>닉네임을 입력해주세요.</span>
              ) : (
                <span>사용가능한 닉네임입니다.</span>
              )}
            </div>
          </label>
          <label id="email-label">
            <span>이메일 주소</span>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={setEmail}
              />
              {emailCheck(email) ? (
                <span>사용 가능한 이메일입니다.</span>
              ) : (
                <span>올바른 이메일 형식이 아닙니다.</span>
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
                onChange={onChangePassword}
              />
              {passwordCheckF(password) ? (
                <span>사용 가능한 비밀번호 입니다.</span>
              ) : (
                <span>영문, 숫자, 특수 문자 포함 6~15자</span>
              )}
            </div>
          </label>
          <label id="password-check-label">
            <span>비밀번호 확인</span>
            <div>
              <input
                type="password"
                id="password-check"
                name="password-check"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
              {mismatchError ? (
                <span>비밀번호가 일치하지 않습니다.</span>
              ) : (
                <span>비밀번호가 일치합니다.</span>
              )}
            </div>

            {signUpSuccess && <span>회원가입되었습니다! 로그인해주세요.</span>}
          </label>
          <button type="submit" disabled={disabledHandler()}>
            회원가입
          </button>
        </form>
        <div>
          이미 회원이신가요?&nbsp;
          <a href="/login">로그인 하러가기</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
