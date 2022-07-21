import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Link to="/signup">
        <button>회원가입하기</button>
      </Link>
      <Link to="/login">
        <button>로그인하기</button>
      </Link>
      <Link to="/lobby">
        <button>로비로가기</button>
      </Link>
      <Link to="/rule">
        <button>룰 북</button>
      </Link>
    </div>
  );
};

export default Main;
