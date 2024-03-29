/* Package */
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import useSound from "use-sound";

/* Hooks */
import useInput from "../hooks/useInput";
import { passwordCheckF } from "../hooks/useCheck";
import { useModal } from "../hooks/useModal";
import { useFocus } from "../hooks/useFocus";

/* Cookies */
import { setCookie } from "../Shared/Cookies";
/* Kakao */
import { KAKAO_AUTH_URL } from "../Shared/Kakao";
/* interface */
import { loginStateProps } from "../typings/db";
/* apis */
import apis from "../Shared/api/apis";

/* Components */
import {
  DefaultBtn,
  DefaultBtnKakao,
  FormWrapSt,
} from "../Components/Common/CommonStyle";
import OneBtnModal from "../elem/OneBtnModal";

/* CSS & SC */
import {
  BackWrap,
  LogLogo,
  Input,
  InputBoxId,
  InputBoxPw,
  SpeechBubble,
  LoginBtnBox,
  Check,
} from "../Components/UserComponents/UserStyled";
import btnSound from "../sounds/buttonSound.mp3";

const Login = ({ setLoginState }: loginStateProps) => {
  const navigate = useNavigate();
  const [username, setUsername, setUsernameValue] = useInput<string>("");
  const [password, setPassword, setPasswordValue] = useInput<string>("");
  const [idFocus, setIdFocus] = useFocus<boolean>(false);
  const [pwFocus, setPwFocus] = useFocus<boolean>(false);
  const [loginCheck, setLoginCheck] = useModal<boolean>(false);
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
      setCookie("imageNum", res.data.imageNum, {
        path: "/",
        expire: "after60m",
      });
      navigate("/lobby");
      setLoginState(true);
    },
    onError: (error, e: any) => {
      navigate("/login");
      setLoginState(false);
      // console.log(error);
      setLoginCheck(e);
      setUsernameValue("");
      setPasswordValue("");
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
    <>
      <BackWrap>
        {loginCheck && (
          <OneBtnModal
            headerText={"로그인 양식이 잘못되었습니다!"}
            upperText={"다시한번 확인해주세요."}
            lowerText={""}
            confirmText={"확인"}
            clickFunc={setLoginCheck}
          />
        )}
        <FormWrapSt>
          <LogLogo top={12.729} bottom={4.6875} alt="logo" rel="preload" />
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
                {username !== "" && <Check>✔</Check>}
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
                {passwordCheckF(password) && <Check>✔</Check>}
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
            <DefaultBtnKakao
              btnType="kakao"
              size={22.82}
              onClick={() => {
                play();
              }}
              style={{ marginBottom: "2.77vw" }}
            ></DefaultBtnKakao>
          </a>
        </FormWrapSt>
      </BackWrap>
    </>
  );
};

export default Login;
