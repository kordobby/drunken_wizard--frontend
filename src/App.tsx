import IngameTest from "./pages/IngameTest";

import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// pages
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Lobby from "./pages/Lobby";
import KakaoRedirect from "./pages/KakaoRedirect";
import Ingame from "./pages/Ingame";
// cookies
import { getCookie, deleteCookie } from "./shared/Cookies";
import WaitingRoom from "./pages/WaitingRoom";
import NotFound from "./pages/NotFound";
import Rule from "./Components/RuleComponents/Rule";
import { toggleFullScreen } from "./hooks/fullScreen";
import { ResizeBtn, RuleBtn } from "./Components/UserComponents/UserStyled";
import resize from "./images/imgs/Resize.svg";
import ruleBook from "./images/rules/rulebook.svg";
import { useModal } from "./hooks/useModal";

function App() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);
  const [ruleModal, setRuleMoadl] = useModal<boolean>(false);
  const token = getCookie("token");
  useEffect(() => {
    token ? setLoginState(true) : setLoginState(false);
  }, [token]);
  console.log(loginState);

  const logoutHandler = () => {
    if (loginState) {
      deleteCookie("token");
      deleteCookie("id");
      deleteCookie("username");
      deleteCookie("nickname");
    }

    if (!loginState) {
      navigate("/login");
    }
  };

  return (
    <>
      <Routes>
        <Route path="/testing" element={<IngameTest></IngameTest>}></Route>
        <Route path="/lobby" element={<Lobby />}></Route>
        <Route
          path="/login"
          element={<Login setLoginState={setLoginState} />}
        />
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          element={<KakaoRedirect setLoginState={setLoginState} />}
          path="/auth/kakao/callback/"
        />
        <Route path="/waiting/:roomId" element={<WaitingRoom />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/ingame/:roomId" element={<Ingame></Ingame>}></Route>
      </Routes>
      <ResizeBtn
        onClick={() => {
          toggleFullScreen(document.body);
        }}
      >
        <img src={resize} />
      </ResizeBtn>
      {ruleModal && <Rule modalHandler={setRuleMoadl} />}
      <RuleBtn
        onClick={(e: any) => {
          setRuleMoadl(e);
        }}
      >
        <img src={ruleBook} />
      </RuleBtn>
      <button onClick={logoutHandler}>????????????</button>
    </>
  );
}

export default App;
