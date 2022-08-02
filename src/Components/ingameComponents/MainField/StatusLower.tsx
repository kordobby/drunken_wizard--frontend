import { useState } from "react";
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

  return (
    <StatBarRow>
      {sleepDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="sleepDuration"
            mouseOver={mouseOver}
            size={2.8125}
            value={sleepDuration}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {sleepDuration > 0 ? (
              <>{mouseOver && <CoverIcon>수면</CoverIcon>}</>
            ) : (
              <>
                {mouseOver && (
                  <CoverIcon>
                    수면
                    <br />
                    저항
                  </CoverIcon>
                )}
              </>
            )}
          </StatIcon>
          <StatCnt size={1.25}>{Math.abs(sleepDuration)}</StatCnt>
        </StatIconBox>
      )}

      {mutedDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="mutedDuration"
            value={mutedDuration}
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {mutedDuration > 0 ? (
              <>{mouseOver && <CoverIcon>침묵</CoverIcon>}</>
            ) : (
              <>
                {mouseOver && (
                  <CoverIcon>
                    침묵
                    <br />
                    저항
                  </CoverIcon>
                )}
              </>
            )}
          </StatIcon>
          <StatCnt size={1.25}>{Math.abs(mutedDuration)}</StatCnt>
        </StatIconBox>
      )}

      {petrifiedDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="petrifiedDuration"
            value={petrifiedDuration}
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {petrifiedDuration > 0 ? (
              <>{mouseOver && <CoverIcon>석화</CoverIcon>}</>
            ) : (
              <>
                {mouseOver && (
                  <CoverIcon>
                    석화
                    <br />
                    저항
                  </CoverIcon>
                )}
              </>
            )}
          </StatIcon>
          <StatCnt size={1.25}>{Math.abs(petrifiedDuration)}</StatCnt>
        </StatIconBox>
      )}

      {poisonedDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            value={poisonedDuration}
            stat="poisonedDuration"
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {poisonedDuration > 0 ? (
              <>{mouseOver && <CoverIcon>중독</CoverIcon>}</>
            ) : (
              <>
                {mouseOver && (
                  <CoverIcon>
                    중독
                    <br />
                    저항
                  </CoverIcon>
                )}
              </>
            )}
          </StatIcon>
          <StatCnt size={1.25}>{Math.abs(poisonedDuration)}</StatCnt>
        </StatIconBox>
      )}

      {stunnedDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            stat="stunnedDuration"
            mouseOver={mouseOver}
            value={stunnedDuration}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {stunnedDuration > 0 ? (
              <>{mouseOver && <CoverIcon>기절</CoverIcon>}</>
            ) : (
              <>
                {mouseOver && (
                  <CoverIcon>
                    기절
                    <br />
                    저항
                  </CoverIcon>
                )}
              </>
            )}
          </StatIcon>
          <StatCnt size={1.25}>{Math.abs(stunnedDuration)}</StatCnt>
        </StatIconBox>
      )}

      {weakDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            value={weakDuration}
            stat="weakDuration"
            mouseOver={mouseOver}
            size={2.8125}
            onMouseOver={MouseOverFunc}
            onMouseLeave={MouseLeaveFunc}
          >
            {weakDuration < 0 ? (
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
          <StatCnt size={1.25}>{Math.abs(weakDuration)}</StatCnt>
        </StatIconBox>
      )}

      {damageModifierDuration !== 0 && (
        <StatIconBox size={3.125}>
          <StatIcon
            value={-damageModifierDuration}
            stat="damageModifierDuration"
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

      {shield === true && (
        <StatIconBox size={3.125}>
          <StatIcon
            value={-1}
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
