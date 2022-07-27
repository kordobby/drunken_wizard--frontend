import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import useSound from "use-sound";
// hooks
// interface
import { ModalType } from "../../typings/db";
// svgs
import rule1 from "../../images/rules/rule1.png";
import rule2 from "../../images/rules/rule2.png";
import rule3 from "../../images/rules/rule3.png";
import rule4 from "../../images/rules/rule4.png";
import rule5 from "../../images/rules/rule5.png";
import rule6 from "../../images/rules/rule6.png";
import rule7 from "../../images/rules/rule7.png";
import rule8 from "../../images/rules/rule8.png";
import rule9 from "../../images/rules/rule9.png";
import rule10 from "../../images/rules/rule10.png";
import rule11 from "../../images/rules/rule11.png";
import rule12 from "../../images/rules/rule12.png";
import bookMark from "../../images/rules/bookMark.png";
import bookCase from "../../images/rules/bookCase.png";
// sounds
import pageflip from "../../sounds/pageflip.mp3";

import {
  Backdrop,
  BookMarkImg,
  CloseButton,
  ModalContainer,
  Page,
  RuleBox,
  RuleWrap,
} from "./RuleStyled";

const Rule = ({ modalHandler }: ModalType) => {
  const book = useRef<any>();
  const [play, { stop }] = useSound(pageflip);

  return (
    <ModalContainer>
      <RuleWrap style={{ backgroundImage: `url(${bookCase})` }}>
        <RuleBox>
          <CloseButton onClick={modalHandler}>
            <BookMarkImg src={bookMark} />
          </CloseButton>
          <HTMLFlipBook
            style={{ margin: "auto" }}
            maxWidth={740}
            maxHeight={860}
            width={518}
            height={602}
            ref={book}
            flippingTime={500}
            onFlip={play}
            size={"stretch"}
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
      </RuleWrap>
      <Backdrop
        onClick={(e: any) => {
          modalHandler(e);
        }}
      />
    </ModalContainer>
  );
};

export default Rule;
