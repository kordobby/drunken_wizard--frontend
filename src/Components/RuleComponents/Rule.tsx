import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import useSound from "use-sound";
// hooks
// interface
import { ModalType } from "../../typings/db";
// svgs
import rule1 from "../../images/rules/rule1.svg";
import rule2 from "../../images/rules/rule2.svg";
import rule3 from "../../images/rules/rlue3.svg";
import rule4 from "../../images/rules/rule4.svg";
import rule5 from "../../images/rules/rule5.svg";
import rule6 from "../../images/rules/rule6.svg";
// sounds
import pageflip from "../../sounds/pageflip.mp3";

import {
  Backdrop,
  BackWrap,
  ModalContainer,
  Page,
  RuleBox,
} from "./RuleStyled";

const Rule = ({ modalClose }: ModalType) => {
  const book = useRef<any>();
  const [play, { stop }] = useSound(pageflip);

  return (
    // <BackWrap style={{ backgroundImage: `url(${ruleBack})` }}>
    <ModalContainer>
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
        </HTMLFlipBook>
      </RuleBox>
      <Backdrop onClick={modalClose} />
    </ModalContainer>
    // </BackWrap>
  );
};

export default Rule;
