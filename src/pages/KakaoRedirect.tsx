import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// cookies
import { getCookie, setCookie } from "../shared/Cookies";
// interface
import { loginStateProps } from "../typings/db";
// apis
import apis from "../shared/api/apis";
import { BackWrap, LogLogo } from "../Components/UserComponents/UserStyled";
import LoadingLobby from "./LoadingLobby";

const KakaoRedirect = ({ setLoginState }: loginStateProps) => {
  const navigate = useNavigate();
  const accessToken = getCookie("token");

  const kakao_query = useQuery("kakao_login", apis.kakaoQR, {
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
      setCookie("imageNum", res.data.imageNum, {
        path: "/",
        expire: "after60m",
      });
      setLoginState(true);
      navigate("/lobby");
    },
    onError: (error) => {
      // console.log("실패");
      setLoginState(false);
      navigate("/login");
    },
  });

  useEffect(() => {
    if (accessToken) {
      navigate("/lobby");
    }
  }, [accessToken]);
  return (
    // <BackWrap>
    //   <LogLogo top={5.729} bottom={4.6875}></LogLogo>
    // </BackWrap>
    <LoadingLobby></LoadingLobby>
  );
};

export default KakaoRedirect;
