import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import matchStatusImg from "../StatusIcon";
import { StatIconsImgProps, StatBarProps } from "../../../typings/typedb";
const PlayerStatBar = ({
  manaCostModifierDuration,
  mutedDuration,
  petrifiedDuration,
  poisonedDuration,
  shield,
  sleepDuration,
  stunnedDuration,
  weakDuration,
  damageModifierDuration,
}: StatBarProps) => {
  return (
    <StatBarWrap>
      <StatBarRow>
        {/* 수면 */}
        {sleepDuration === 0 && (
          <StatIconBox>
            <StatIcon stat="sleepDuration"></StatIcon>
            <StatCnt>{sleepDuration}</StatCnt>
          </StatIconBox>
        )}
        {/* 침묵 */}
        {mutedDuration === 0 && (
          <StatIconBox>
            <StatIcon stat="mutedDuration"></StatIcon>
            <StatCnt>{mutedDuration}</StatCnt>
          </StatIconBox>
        )}
        {/* 석화 */}
        {petrifiedDuration === 0 && (
          <StatIconBox>
            <StatIcon stat="petrifiedDuration"></StatIcon>
            <StatCnt>{petrifiedDuration}</StatCnt>
          </StatIconBox>
        )}
        {/* 독 */}
        {poisonedDuration === 0 && (
          <StatIconBox>
            <StatIcon stat="poisonedDuration"></StatIcon>
            <StatCnt>{poisonedDuration}</StatCnt>
          </StatIconBox>
        )}
        {/* 기절 */}
        {stunnedDuration === 0 && (
          <StatIconBox>
            <StatIcon stat="stunnedDuration"></StatIcon>
            <StatCnt>{stunnedDuration}</StatCnt>
          </StatIconBox>
        )}
        {/* 약화 */}
        {weakDuration === 0 && (
          <StatIconBox>
            <StatIcon stat="weakDuration"></StatIcon>
            <StatCnt>{weakDuration}</StatCnt>
          </StatIconBox>
        )}
        {/* 뎀증? */}
        {damageModifierDuration === 0 && (
          <StatIconBox>
            <StatIcon stat="damageModifierDuration"></StatIcon>
            <StatCnt>{weakDuration}</StatCnt>
          </StatIconBox>
        )}
        {/* 실드 */}
        {!shield && (
          <StatIconBox>
            <StatIcon stat="shield"></StatIcon>
          </StatIconBox>
        )}
      </StatBarRow>
    </StatBarWrap>
  );
};

const StatBarWrap = styled.div`
  width: 100%;
  height: 70px;
  ${flex({ direction: "column", justify: "center", align: "center" })}
`;

const StatBarRow = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
`;

const StatIconBox = styled.div`
  width: 30px;
  height: 30px;
  ${flex({
    justify: "center",
    align: "center",
  })}
  position: relative;
`;

const StatIcon = styled.div<StatIconsImgProps>`
  width: 28px;
  height: 28px;
  background-image: url(${(props) => matchStatusImg(props.stat)});
  background-size: cover;
  border-radius: 24px;
`;
const StatCnt = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  border-radius: 10px;
  background-color: var(--beige);
  ${flex({ justify: "center", align: "center" })}
  font-size : 6px;
`;

export default PlayerStatBar;
