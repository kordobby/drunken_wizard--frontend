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
  const arr = [
    { sleepDuration: sleepDuration },
    { mutedDuration: mutedDuration },
    { petrifiedDuration: petrifiedDuration },
    { petrifiedDuration: petrifiedDuration },
    { poisonedDuration: poisonedDuration },
    { stunnedDuration: stunnedDuration },
    { weakDuration: weakDuration },
    { damageModifierDuration: damageModifierDuration },
    { shield: shield },
  ];
  return (
    <StatBarRow>
      {sleepDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="sleepDuration"></StatIcon>
          <StatCnt>{sleepDuration}</StatCnt>
        </StatIconBox>
      )}

      {mutedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="mutedDuration"></StatIcon>
          <StatCnt>{mutedDuration}</StatCnt>
        </StatIconBox>
      )}

      {petrifiedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="petrifiedDuration"></StatIcon>
          <StatCnt>{petrifiedDuration}</StatCnt>
        </StatIconBox>
      )}

      {poisonedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="poisonedDuration"></StatIcon>
          <StatCnt>{poisonedDuration}</StatCnt>
        </StatIconBox>
      )}

      {stunnedDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="stunnedDuration"></StatIcon>
          <StatCnt>{stunnedDuration}</StatCnt>
        </StatIconBox>
      )}

      {weakDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="weakDuration"></StatIcon>
          <StatCnt>{weakDuration}</StatCnt>
        </StatIconBox>
      )}

      {damageModifierDuration !== 0 && (
        <StatIconBox>
          <StatIcon stat="damageModifierDuration"></StatIcon>
          <StatCnt>{weakDuration}</StatCnt>
        </StatIconBox>
      )}

      {shield && (
        <StatIconBox>
          <StatIcon stat="shield"></StatIcon>
        </StatIconBox>
      )}
    </StatBarRow>
  );
};

export default PlayerStatBar;
