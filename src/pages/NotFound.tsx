import React from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../Shared/Cookies";

const NotFound = () => {
  const token = getCookie("token");

  return (
    <div>
      {token ? (
        <div>
          <span>잘못된 접근입니다! 로비 페이지로 가주세요 :) </span>
          <Link to={"/lobby"}>
            <button>돌아가기</button>
          </Link>
        </div>
      ) : (
        <div>
          <span>잘못된 접근입니다! 로그인 페이지로 가주세요 :)</span>
          <Link to={"/login"}>
            <button>돌아가기</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotFound;
