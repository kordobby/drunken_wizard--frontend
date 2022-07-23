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
      {sleepDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="sleepDuration" size={3.75}></StatIcon>
          <StatCnt size={1.666}>{sleepDuration}</StatCnt>
        </StatIconBox>
      )}

      {mutedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="mutedDuration" size={3.75}></StatIcon>
          <StatCnt size={1.666}>{mutedDuration}</StatCnt>
        </StatIconBox>
      )}

      {petrifiedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="petrifiedDuration" size={3.75}></StatIcon>
          <StatCnt size={1.666}>{petrifiedDuration}</StatCnt>
        </StatIconBox>
      )}

      {poisonedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="poisonedDuration" size={3.75}></StatIcon>
          <StatCnt size={1.666}>{poisonedDuration}</StatCnt>
        </StatIconBox>
      )}

      {stunnedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="stunnedDuration" size={3.75}></StatIcon>
          <StatCnt size={1.666}>{stunnedDuration}</StatCnt>
        </StatIconBox>
      )}

      {weakDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="weakDuration" size={3.75}></StatIcon>
          <StatCnt size={1.666}>{weakDuration}</StatCnt>
        </StatIconBox>
      )}

      {damageModifierDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="damageModifierDuration" size={3.75}></StatIcon>
          <StatCnt size={1.666}>{weakDuration}</StatCnt>
        </StatIconBox>
      )}

      {shield && (
        <StatIconBox>
          <StatIcon stat="shield" size={3.75}></StatIcon>
        </StatIconBox>
      )}
    </StatBarRow>
  );
};

export default PlayerStatBar;
