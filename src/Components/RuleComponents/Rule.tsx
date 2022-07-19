import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import useSound from "use-sound";
// hooks
// interface
import { ModalType } from "../../typings/db";
// svgs
import rule1 from "../../images/rules/rule1.svg";
import rule2 from "../../images/rules/rule2.svg";
import rule3 from "../../images/rules/rule3.svg";
import rule4 from "../../images/rules/rule4.svg";
import rule5 from "../../images/rules/rule5.svg";
import rule6 from "../../images/rules/rule6.svg";
import rule7 from "../../images/rules/rule7.svg";
import rule8 from "../../images/rules/rule8.svg";
import rule9 from "../../images/rules/rule9.svg";
import rule10 from "../../images/rules/rule10.svg";
import rule11 from "../../images/rules/rule11.svg";
import rule12 from "../../images/rules/rule12.svg";
import bookMark from "../../images/rules/bookMark.svg";
import bookCase from "../../images/rules/bookCase.svg";
// sounds
import pageflip from "../../sounds/pageflip.mp3";

import {
  Backdrop,
  BackWrap,
  CloseButton,
  ModalContainer,
  Page,
  RuleBox,
  RuleWrap,
} from "./RuleStyled";

const Rule = ({ modalClose }: ModalType) => {
  console.log("렌더링 테스트 : Rule");
  const book = useRef<any>();
  const [play, { stop }] = useSound(pageflip);

  return (
    // <BackWrap style={{ backgroundImage: `url(${ruleBack})` }}>
    <ModalContainer>
      <RuleWrap style={{ backgroundImage: `url(${bookCase})` }}>
        <RuleBox>
          <HTMLFlipBook
            maxWidth={740}
            maxHeight={860}
            width={560}
            height={650}
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
            <Page src={rule7} />
            <Page src={rule8} />
            <Page src={rule9} />
            <Page src={rule10} />
            <Page src={rule11} />
            <Page src={rule12} />
          </HTMLFlipBook>
        </RuleBox>
        <CloseButton onClick={modalClose}>
          <img src={bookMark} />
        </CloseButton>
      </RuleWrap>
      <Backdrop onClick={modalClose} />
    </ModalContainer>
    // </BackWrap>
  );
};

export default Rule;
