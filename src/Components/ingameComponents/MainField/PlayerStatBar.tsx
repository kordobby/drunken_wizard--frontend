/* modules */
import { StatBarProps } from "../../../typings/typedb";

/* CSS & SC */
import { StatBarRow, StatIconBox, StatIcon, StatCnt } from "../InGameStyled";
const PlayerStatBar = ({
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
  return (
    <StatBarRow>
      {/* 수면 */}
      {sleepDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="sleepDuration"></StatIcon>
          <StatCnt>{sleepDuration}</StatCnt>
        </StatIconBox>
      )}
      {/* 침묵 */}
      {mutedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="mutedDuration"></StatIcon>
          <StatCnt>{mutedDuration}</StatCnt>
        </StatIconBox>
      )}
      {/* 석화 */}
      {petrifiedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="petrifiedDuration"></StatIcon>
          <StatCnt>{petrifiedDuration}</StatCnt>
        </StatIconBox>
      )}
      {/* 독 */}
      {poisonedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="poisonedDuration"></StatIcon>
          <StatCnt>{poisonedDuration}</StatCnt>
        </StatIconBox>
      )}
      {/* 기절 */}
      {stunnedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="stunnedDuration"></StatIcon>
          <StatCnt>{stunnedDuration}</StatCnt>
        </StatIconBox>
      )}
      {/* 약화 */}
      {weakDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="weakDuration"></StatIcon>
          <StatCnt>{weakDuration}</StatCnt>
        </StatIconBox>
      )}
      {/* 뎀증? */}
      {damageModifierDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="damageModifierDuration"></StatIcon>
          <StatCnt>{weakDuration}</StatCnt>
        </StatIconBox>
      )}
      {/* 실드 */}
      {shield && (
        <StatIconBox>
          <StatIcon stat="shield"></StatIcon>
        </StatIconBox>
      )}
    </StatBarRow>
  );
};

export default PlayerStatBar;
