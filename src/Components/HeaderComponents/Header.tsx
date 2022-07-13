import React from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../../Shared/Cookies";

const Header = () => {
  const userNick = getCookie("nickname");

  return (
    <div>
      <Link to={"/rule"}>
        <button>룰북보기</button>
      </Link>
      <span>userNick</span>
    </div>
  );
};

export default Header;
