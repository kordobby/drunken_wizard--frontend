// package
import React, { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// interface
import { IUser } from "../typings/db";
// fetcher
import fetcher from "../utils/fetcher";
// hooks
import useInput from "../hooks/useInput";
import { idCheck, emailCheck, passwordCheckF } from "../hooks/useCheck";

const registerMT = (data: IUser) => {
  return axios.post("http://3.35.214.100/user/signup", data);
};

const SignUp = () => {
  // const { isLoading, isSuccess, status, isError, data, error } = useQuery(
  //   "user",
  //   () => fetcher({ queryKey: "/api/users" })
  // );
  const [username, setUsername] = useInput("");
  const [nickname, setNicname] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // id check
  // const onIdCheck = () => {
  //   dispatch(__checkUserId(username));
  // };

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

  // button disable
  const disabledHandler = () => {
    if (idCheck(username) === true) return true;
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

  // const mutation = useMutation<
  //   IUser,
  //   AxiosError,
  //   { username: string; nickname: string; email: string; password: string }
  // >(
  //   "user",
  //   (data) => axios.post("/api/users", data).then((response) => response.data),
  //   {
  //     onMutate() {
  //       setSignUpError("");
  //       setSignUpSuccess(false);
  //     },
  //     onSuccess() {
  //       setSignUpSuccess(true);
  //     },
  //     onError(error: any) {
  //       setSignUpError(error.response?.data);
  //     },
  //   }
  // );

  // const handleSubmit = useCallback(
  //   (e: any) => {
  //     e.preventDefault();
  //     if (!mismatchError && nickname) {
  //       console.log("서버로 회원가입하기");
  //       mutation.mutate({ username, nickname, email, password });
  //     }
  //   },
  //   [username, nickname, email, password, mismatchError, mutation]
  // );

  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

  // mutate
  const { mutate } = useMutation(registerMT, {
    onSuccess: () => {
      navigate("/login");
      setSignUpSuccess(true);
    },
    onError: (error: string) => {
      navigate("/");
      setSignUpError(error);
    },
  });

  // submit
  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      // console.log({
      //   username: username,
      //   nickname: nickname,
      //   email: email,
      //   password: password,
      //   passwordCheck: passwordCheck,
      // });
      if (!mismatchError) {
        mutate({
          username: username,
          nickname: nickname,
          email: email,
          password: password,
        });
      }
    },
    [username, nickname, email, password, passwordCheck]
  );

  return (
    <div>
      <div id="container">
        <form onSubmit={onSubmit}>
          <label id="user-id-label">
            <span>아이디</span>
            {/* <button onClick={onIdCheck} disabled={idCheckDisabled()}> */}
            {/* 중복확인
            </button> */}
            <div>
              <input
                type="text"
                id="user-id"
                name="user-id"
                value={username}
                onChange={setUsername}
              />
              {signUpError ? (
                <span>로그인 시 사용할 ID를 입력해주세요.</span>
              ) : (
                <span>사용가능한 ID입니다.</span>
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
                <span>비밀번호를 재입력 해주세요.</span>
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
