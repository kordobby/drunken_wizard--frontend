// KakaoRedirect.js
import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
// cookies
import { setCookie } from "../shared/Cookies";

import axios from "axios";

export interface loginStateProps {
  setLoginState: Dispatch<SetStateAction<boolean>>;
}

const KakaoRedirect = ({ setLoginState }: loginStateProps) => {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  const kakaoQR = () => {
    return axios.get(
      `http://3.35.214.100:8000/user/kakao/callback?code=${code}`
    );
  };

  const kakao_query = useQuery("kakao_login", kakaoQR, {
    onSuccess: (res) => {
      setCookie("token", res.headers.authorization, {
        path: "/",
        expire: "after60m",
      });
      // console.log("성공했어!", data.data);
      // console.log(data.data.nickname);
      setCookie("id", res.headers.id, {
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
      navigate("/");
      setLoginState(true);
    },
    onError: (error) => {
      console.log("실패");
      navigate("/");
      setLoginState(false);
    },
  });

  return (
    <div>
      <div>
        <span>잠시만 기다려 주세요! 로그인 중입니다.</span>
      </div>
    </div>
  );
};

export default KakaoRedirect;
