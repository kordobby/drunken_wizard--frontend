import { useState } from "react";

import {
  LogLogo,
  BackWrap,
  LeftBeerImg,
  RightBeerImg,
  BeerBgImg,
  Shadow,
  DarkBg,
} from "../Components/UserComponents/UserStyled";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toggleFullScreen } from "../hooks/fullScreen";
import { DefaultBtnL } from "../Components/Common/CommonStyle";
const Splash = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (toggle) {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [toggle]);

  const toggleFunc = () => {
    toggleFullScreen(document.body);
    setTimeout(() => {
      setToggle(!toggle);
    }, 2000);
  };
  return (
    <BackWrap>
      {toggle ? (
        <>
          {/* <DarkBg></DarkBg> */}
          <LogLogo top={5.729} bottom={4.6875}></LogLogo>
          <BeerBgImg></BeerBgImg>
          <RightBeerImg></RightBeerImg>
          <LeftBeerImg></LeftBeerImg>
          <Shadow></Shadow>
        </>
      ) : (
        <>
          <LogLogo top={5.729} bottom={4.6875}></LogLogo>
          <DefaultBtnL disabled={false} onClick={toggleFunc}>
            입장하기
          </DefaultBtnL>
        </>
      )}
    </BackWrap>
  );
};

export default Splash;
