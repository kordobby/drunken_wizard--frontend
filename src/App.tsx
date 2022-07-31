import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// hook
import { toggleFullScreen } from "./hooks/fullScreen";
import { useModal } from "./hooks/useModal";
// pages
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Lobby from "./pages/Lobby";
import KakaoRedirect from "./pages/KakaoRedirect";
import Ingame from "./pages/Ingame";
// cookies
import { getCookie } from "./shared/Cookies";
// componentQWED
import WaitingRoom from "./pages/WaitingRoom";
import NotFound from "./pages/NotFound";
import Rule from "./Components/RuleComponents/Rule";
// css
import {
  ResizeBtn,
  RuleBtn,
  RuleBuBleBtn,
} from "./Components/UserComponents/UserStyled";
// image
import resize from "./images/imgs/Resize.webp";
import ruleBook from "./images/rules/ruleBook.webp";
import Splash from "./pages/Splash";
import ruleBubble from "./images/lobby/ruleBubble.webp";
function App() {
  const [loading, setLoding] = useState<boolean>(true);
  const [loginState, setLoginState] = useState(false);
  const [ruleModal, setRuleMoadl] = useModal<boolean>(false);
  const [tutorial, setTutorial] = useState<boolean>(false);
  const token = getCookie("token");
  useEffect(() => {
    token ? setLoginState(true) : setLoginState(false);
  }, [token]);

  // const logoutHandler = () => {
  //   if (loginState) {
  //     deleteCookie("token");
  //     deleteCookie("id");
  //     deleteCookie("username");
  //     deleteCookie("nickname");
  //   }

  //   if (!loginState) {
  //     navigate("/login");
  //   }
  // };

  return (
    <>
      <Routes>
        {/* <Route path="/loading" element={<LoadingLobby />}></Route> */}
        <Route path="/" element={<Splash />}></Route>
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
          setTutorial(true);
        }}
      >
        <img src={ruleBook} />
      </RuleBtn>
      {!tutorial && <RuleBuBleBtn src={ruleBubble}></RuleBuBleBtn>}
    </>
  );
}

export default App;
