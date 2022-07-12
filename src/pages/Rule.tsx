import React, { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import useSound from "use-sound";
import styled from "styled-components";
import { Link } from "react-router-dom";
// hooks
import { toggleFullScreen } from "../hooks/fullScreen";
// svgs
import rule1 from "../images/rules/rule1.svg";
import rule2 from "../images/rules/rule2.svg";
import rule3 from "../images/rules/rlue3.svg";
import rule4 from "../images/rules/rule4.svg";
import rule5 from "../images/rules/rule5.svg";
import rule6 from "../images/rules/rule6.svg";
import resize from "../images/imgs/Resize.svg";
import skipBtn from "../images/buttons/BTN_rule.svg";
import ruleBack from "../images/background/ruleBackground.svg";
// sounds
import pageflip from "../sounds/pageflip.mp3";
import { Button1 } from "../Components/UserComponents/UserStyled";

const Rule = () => {
  const book = useRef<any>();
  const [play, { stop }] = useSound(pageflip);

  useEffect(() => {
    toggleFullScreen(document.body);
  }, []);

  return (
    <BackWrap style={{ backgroundImage: `url(${ruleBack})` }}>
      <Wrap>
        <HTMLFlipBook
          maxWidth={740}
          maxHeight={860}
          width={633}
          height={735}
          ref={book}
          flippingTime={500}
          onFlip={play}
        >
          <Page src={rule1} />
          <Page src={rule2} />
          <Page src={rule3} />
          <Page src={rule4} />
          <Page src={rule5} />
          <Page src={rule6} />
        </HTMLFlipBook>
        <ButtonBox>
          <Button
            onClick={() => {
              book.current.pageFlip().flipPrev();
            }}
            style={{ backgroundImage: `url(${skipBtn})` }}
          >
            이전 페이지
          </Button>
          <Link to={"/lobby"}>
            <Button style={{ backgroundImage: `url(${skipBtn})` }}>Skip</Button>
          </Link>
          <Button1
            onClick={() => {
              book.current.pageFlip().flipNext();
            }}
            style={{ backgroundImage: `url(${skipBtn})` }}
          >
            다음 페이지
          </Button1>
        </ButtonBox>
        <ResizeBtn
          onClick={() => {
            toggleFullScreen(document.body);
          }}
        >
          <img src={resize} />
        </ResizeBtn>
      </Wrap>
    </BackWrap>
  );
};

export default Rule;
const Page = styled.img`
  box-shadow: 5px 5px 5px 5px gray;
`;

const BackWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1000;
`;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; ;
`;

const ButtonBox = styled.div`
  margin: 60px;
`;
const Button = styled.button`
  width: 211px;
  height: 83px;
  border: none;
  margin-right: 16px;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;

const ResizeBtn = styled.button`
  border: none;
  background-color: transparent;
  position: fixed;
  top: 50px;
  right: 50px;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
    box-shadow: 0px 0px 10px 2px #fd6f33;
  }
`;
