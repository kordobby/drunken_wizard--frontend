import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
// hook
import { toggleFullScreen } from "./hooks/fullScreen";
import { useModal } from "./hooks/useModal";
// cookies
import { getCookie } from "./Shared/Cookies";
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
// pages
const SignUp = loadable(() => import("./pages/SignUp"));
const Login = loadable(() => import("./pages/Login"));
const Lobby = loadable(() => import("./pages/Lobby"));
const KakaoRedirect = loadable(() => import("./pages/KakaoRedirect"));
const Ingame = loadable(() => import("./pages/Ingame"));

function App() {
  const [loading, setLoding] = useState<boolean>(true);
  const [loginState, setLoginState] = useState(false);
  const [ruleModal, setRuleMoadl] = useModal<boolean>(false);
  const [tutorial, setTutorial] = useState<boolean>(false);
  const token = getCookie("token");
  useEffect(() => {
    token ? setLoginState(true) : setLoginState(false);
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />}></Route>
        <Route
          path="/login"
          element={<Login setLoginState={setLoginState} />}
        />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          element={<KakaoRedirect setLoginState={setLoginState} />}
          path="/auth/kakao/callback/"
        />
        <Route path="/lobby" element={<Lobby />}></Route>
        <Route path="/waiting/:roomId" element={<WaitingRoom />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
        <Route path="/ingame/:roomId" element={<Ingame></Ingame>}></Route>
      </Routes>
      <ResizeBtn
        onClick={() => {
          toggleFullScreen(document.body);
        }}
      >
        <img src={resize} alt="리사이즈" />
      </ResizeBtn>
      {ruleModal && <Rule modalHandler={setRuleMoadl} />}
      <RuleBtn
        onClick={(e: any) => {
          setRuleMoadl(e);
          setTutorial(true);
        }}
      >
        <img src={ruleBook} alt="룰북" />
      </RuleBtn>
      {!tutorial && <RuleBuBleBtn src={ruleBubble}></RuleBuBleBtn>}
    </>
  );
}

export default App;
