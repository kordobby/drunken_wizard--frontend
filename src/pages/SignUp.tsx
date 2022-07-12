// package
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import useSound from "use-sound";
// hooks
import useInput from "../hooks/useInput";
import { toggleFullScreen } from "../hooks/fullScreen";
import { idCheck, emailCheck, passwordCheckF } from "../hooks/useCheck";
import { useFocus } from "../hooks/useFocus";
// apis
import apis from "../shared/api/apis";
// css
import {
  BackWrap,
  SignLogo,
  Input,
  InputBoxId,
  InputBoxPw,
  Button,
  SpeechBubble,
  SpeechSpan,
  ButtonBox,
  IdCheckButton1,
  IdCheckButton2,
  Wrap,
  ResizeBtn,
  Button1,
} from "../Components/UserComponents/UserStyled";
// svgs
import logBack from "../images/background/loginBackground.svg";
import cancelBtn from "../images/buttons/BTN_cancel.svg";
import regBtn from "../images/buttons/BTN_register.svg";
import regBtn2 from "../images/buttons/BTN_register2.svg";
import logo from "../images/logo/logo.svg";
import speechBubble from "../images/imgs/SpeechBubble.svg";
import resize from "../images/imgs/Resize.svg";
// sounds
import btnSound from "../sounds/buttonSound.mp3";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useInput<string>("");
  const [email, setEmail] = useInput<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [mismatchError, setMismatchError] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);
  const [signUpCheckId, setSignUpCheckId] = useState<boolean>(false);
  // focus State
  const [idFocus, setIdFocus] = useFocus<boolean>(false);
  const [nickFocus, setNickFocus] = useFocus<boolean>(false);
  const [emailFocus, setEmailFocus] = useFocus<boolean>(false);
  const [pwFocus, setPwFocus] = useFocus<boolean>(false);
  const [pwCheckFocus, setPwCheckFocus] = useFocus<boolean>(false);
  const navigate = useNavigate();
  const [play, { stop }] = useSound(btnSound);

  // id disable 올바른 형식이 아니거나 중복확인이 됬다면 버튼을 막아놈
  const idCheckDisabled = () => {
    if (!idCheck(username) === true) return true;
    if (username === "") return true;
    if (signUpCheckId === true) return true;
    else return false;
  };

  // button disable 로그인 할 때 올바른 형식이 아니면 버튼을 막아놨음
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

  // id onChangeEvent, 인풋창에 다시 작성하거나 지우면 다시 중복확인하게 함
  const onChangeIdCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      setSignUpCheckId(false);
    },
    [username]
  );

  // password onChangeEvent
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

  // id check mutate
  const { mutate: signUpidCheck } = useMutation(apis.signUpIdCheckMT, {
    onMutate: () => {
      setSignUpCheckId(true);
    },
    onSuccess: (res) => {
      console.log(res);
      alert("사용할 수 있는 ID입니다.");
    },
    onError: (error: string) => {
      setSignUpCheckId(false);
      console.log(error);
    },
  });

  // signUp mutate
  const { mutate: signUp } = useMutation(apis.signUpMT, {
    onSuccess: () => {
      setSignUpSuccess(true);
      navigate("/login");
    },
    onError: (error: string) => {
      navigate("/signup");
      setSignUpError(error);
    },
  });

  // id check handler
  const onIdCheck = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      signUpidCheck({ username: username });
    },
    [username, signUpidCheck]
  );

  // submit handler
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
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
    <BackWrap style={{ backgroundImage: `url(${logBack})` }}>
      <Wrap>
        <SignLogo src={logo} />
        <form>
          <label id="user-id-label">
            <InputBoxId>
              <div>
                <Input
                  type="text"
                  id="user-id"
                  name="user-id"
                  placeholder="ID"
                  value={username}
                  onChange={onChangeIdCheck}
                  onFocus={setIdFocus}
                  onBlur={setIdFocus}
                />
              </div>
              <div>
                {signUpCheckId ? (
                  <IdCheckButton1
                    onClick={onIdCheck}
                    disabled={idCheckDisabled()}
                  >
                    사용가능
                  </IdCheckButton1>
                ) : (
                  <IdCheckButton2
                    onClick={onIdCheck}
                    disabled={idCheckDisabled()}
                  >
                    중복확인
                  </IdCheckButton2>
                )}
              </div>
              {idCheck(username) &&
                username !== "" &&
                signUpCheckId === false &&
                idFocus && (
                  <SpeechBubble
                    style={{ backgroundImage: `url(${speechBubble})` }}
                  >
                    <SpeechSpan>ID중복 확인을 해주세요.</SpeechSpan>
                  </SpeechBubble>
                )}
              {idCheck(username) &&
                username !== "" &&
                signUpCheckId === true &&
                idFocus && (
                  <SpeechBubble
                    style={{ backgroundImage: `url(${speechBubble})` }}
                  >
                    <SpeechSpan>사용가능한 ID입니다.</SpeechSpan>
                  </SpeechBubble>
                )}
              {!idCheck(username) && username !== "" && idFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>올바른 아이디 형식이 아닙니다.</SpeechSpan>
                </SpeechBubble>
              )}
              {username === "" && idFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>아이디를 입력해주세요.</SpeechSpan>
                </SpeechBubble>
              )}
            </InputBoxId>
          </label>
          <label id="nickname-label">
            <InputBoxId>
              <Input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="NickName"
                value={nickname}
                onChange={setNickname}
                onFocus={setNickFocus}
                onBlur={setNickFocus}
              />
              {!nickname && nickFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>닉네임을 입력해주세요.</SpeechSpan>
                </SpeechBubble>
              )}
              {nickname && nickFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>사용가능한 닉네임입니다.</SpeechSpan>
                </SpeechBubble>
              )}
            </InputBoxId>
          </label>
          <label id="email-label">
            <InputBoxId>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="E-Mail"
                value={email}
                onChange={setEmail}
                onFocus={setEmailFocus}
                onBlur={setEmailFocus}
              />
              {emailCheck(email) && emailFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>사용 가능한 이메일입니다.</SpeechSpan>
                </SpeechBubble>
              )}
              {!emailCheck(email) && emailFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>올바른 이메일 형식이 아닙니다.</SpeechSpan>
                </SpeechBubble>
              )}
            </InputBoxId>
          </label>
          <label id="password-label">
            <InputBoxId>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="PassWord"
                onChange={onChangePassword}
                onFocus={setPwFocus}
                onBlur={setPwFocus}
              />
              {passwordCheckF(password) && pwFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>사용 가능한 비밀번호 입니다.</SpeechSpan>
                </SpeechBubble>
              )}
              {!passwordCheckF(password) && pwFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>영문, 숫자, 특수 문자 포함 6~15자</SpeechSpan>
                </SpeechBubble>
              )}
            </InputBoxId>
          </label>
          <label id="password-check-label">
            <InputBoxPw>
              <Input
                type="password"
                id="password-check"
                name="password-check"
                placeholder="PassWordCheck"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                onFocus={setPwCheckFocus}
                onBlur={setPwCheckFocus}
              />
              {mismatchError && pwCheckFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>비밀번호가 일치하지 않습니다.</SpeechSpan>
                </SpeechBubble>
              )}
              {!mismatchError && pwCheckFocus && (
                <SpeechBubble
                  style={{ backgroundImage: `url(${speechBubble})` }}
                >
                  <SpeechSpan>비밀번호가 일치합니다.</SpeechSpan>
                </SpeechBubble>
              )}
            </InputBoxPw>
            {/* {signUpSuccess && <span>회원가입되었습니다! 로그인해주세요.</span>} */}
          </label>
        </form>
        <ButtonBox>
          {disabledHandler() ? (
            <Button style={{ backgroundImage: `url(${regBtn})` }}></Button>
          ) : (
            <Button
              onClick={(e) => {
                onSubmit(e);
                play();
              }}
              type="submit"
              disabled={disabledHandler()}
              style={{ backgroundImage: `url(${regBtn2})` }}
            ></Button>
          )}

          <Link to="/login">
            <Button1
              onClick={() => {
                play();
              }}
              style={{ backgroundImage: `url(${cancelBtn})` }}
            />
          </Link>
        </ButtonBox>
      </Wrap>
      <ResizeBtn
        onClick={() => {
          toggleFullScreen(document.body);
        }}
      >
        <img src={resize} />
      </ResizeBtn>
    </BackWrap>
  );
};

export default SignUp;
