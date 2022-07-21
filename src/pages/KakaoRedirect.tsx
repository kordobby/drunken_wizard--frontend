import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// cookies
import { getCookie, setCookie } from "../shared/Cookies";
// interface
import { loginStateProps } from "../typings/db";
// apis
import apis from "../shared/api/apis";

const KakaoRedirect = ({ setLoginState }: loginStateProps) => {
  const navigate = useNavigate();
  const accessToken = getCookie("token");

  const kakao_query = useQuery("kakao_login", apis.kakaoQR, {
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

      setLoginState(true);
      navigate("/lobby");
    },
    onError: (error) => {
      console.log("실패");
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
    <div>
      <div>
        <span>잠시만 기다려 주세요! 로그인 중입니다.</span>
      </div>
    </div>
  );
};

export default KakaoRedirect;
