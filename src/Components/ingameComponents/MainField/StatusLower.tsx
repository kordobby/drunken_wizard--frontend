import { useEffect, useState } from "react";
/* modules */
import { StatBarProps } from "../../../typings/typedb";
import { useCallback } from "react";
/* CSS & SC */
import {
  StatBarRow,
  StatIconBox,
  StatIcon,
  StatCnt,
  CoverIcon,
} from "../InGameStyled/InGameStyled";
const StatusLower = ({
  manaCostModifierDuration, // 나중에 추가될 상태이상
  mutedDuration,
  petrifiedDuration,
  poisonedDuration,
  shield,
  sleepDuration,
  stunnedDuration,
  weakDuration,
  damageModifierDuration,
}: StatBarProps) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const MouseOverFunc = useCallback(() => {
    setMouseOver(true);
  }, [mouseOver]);

  const MouseLeaveFunc = useCallback(() => {
    setMouseOver(false);
  }, [mouseOver]);

  const weakDurationFunc = (value: number) => {
    if (value > 0) return "weakDuration";
    else return "antiWeakDuration";
  };

  const damageModifierFunc = (value: number) => {
    if (value > 0) return "damageModifierDuration";
    else return "antiDamageModifierDuration";
  };

  return (
    <StatBarRow>
      {sleepDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="sleepDuration"
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {mouseOver && <CoverIcon>수면</CoverIcon>}
          </StatIcon>
          <StatCnt size={1.25}>{sleepDuration}</StatCnt>
        </StatIconBox>
      )}

      {mutedDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="mutedDuration"
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {mouseOver && <CoverIcon>침묵</CoverIcon>}
          </StatIcon>
          <StatCnt size={1.25}>{mutedDuration}</StatCnt>
        </StatIconBox>
      )}

      {petrifiedDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="petrifiedDuration"
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {mouseOver && <CoverIcon>석화</CoverIcon>}
          </StatIcon>
          <StatCnt size={1.25}>{petrifiedDuration}</StatCnt>
        </StatIconBox>
      )}

      {poisonedDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="poisonedDuration"
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {mouseOver && <CoverIcon>독</CoverIcon>}
          </StatIcon>
          <StatCnt size={1.25}>{poisonedDuration}</StatCnt>
        </StatIconBox>
      )}

      {stunnedDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="stunnedDuration"
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {mouseOver && <CoverIcon>기절</CoverIcon>}
          </StatIcon>
          <StatCnt size={1.25}>{stunnedDuration}</StatCnt>
        </StatIconBox>
      )}

      {weakDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat={weakDurationFunc(weakDuration)}
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {weakDuration <= 0 ? (
              <>{mouseOver && <CoverIcon>방어</CoverIcon>}</>
            ) : (
              <>
                {mouseOver && (
                  <CoverIcon>
                    약점
                    <br />
                    노출
                  </CoverIcon>
                )}
              </>
            )}
          </StatIcon>
          <StatCnt size={1.25}>{weakDuration}</StatCnt>
        </StatIconBox>
      )}

      {damageModifierDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat={damageModifierFunc(damageModifierDuration)}
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {damageModifierDuration > 0 ? (
              <>
                {mouseOver && (
                  <CoverIcon>
                    마법
                    <br />
                    증폭
                  </CoverIcon>
                )}
              </>
            ) : (
              <>
                {mouseOver && (
                  <CoverIcon>
                    마법
                    <br />
                    약화
                  </CoverIcon>
                )}
              </>
            )}
          </StatIcon>
          <StatCnt size={1.25}>{Math.abs(damageModifierDuration)}</StatCnt>
        </StatIconBox>
      )}

      {shield && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="shield"
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {mouseOver && <CoverIcon>실드</CoverIcon>}
          </StatIcon>
        </StatIconBox>
      )}
    </StatBarRow>
  );
};

export default StatusLower;
