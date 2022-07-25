/* modules */
import { StatBarProps } from "../../../typings/typedb";

/* CSS & SC */
import {
  StatBarRow,
  StatIconBox,
  StatIcon,
  StatCnt,
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
  /*
    manaCostModifierDuration, // 나중에 추가될 상태이상
  mutedDuration,
  petrifiedDuration,
  poisonedDuration,
  shield,
  sleepDuration,
  stunnedDuration,
  weakDuration,
  damageModifierDuration,
  */
  return (
    <StatBarRow>
      {sleepDuration !== 0 && (
        <StatIconBox size={60}>
          <StatIcon stat="sleepDuration" size={54}></StatIcon>
          <StatCnt size={24}>{sleepDuration}</StatCnt>
        </StatIconBox>
      )}

      {mutedDuration !== 0 && (
        <StatIconBox size={60}>
          <StatIcon stat="mutedDuration" size={54}></StatIcon>
          <StatCnt size={24}>{mutedDuration}</StatCnt>
        </StatIconBox>
      )}

      {petrifiedDuration !== 0 && (
        <StatIconBox size={60}>
          <StatIcon stat="petrifiedDuration" size={54}></StatIcon>
          <StatCnt size={24}>{petrifiedDuration}</StatCnt>
        </StatIconBox>
      )}

      {poisonedDuration !== 0 && (
        <StatIconBox size={60}>
          <StatIcon stat="poisonedDuration" size={54}></StatIcon>
          <StatCnt size={24}>{poisonedDuration}</StatCnt>
        </StatIconBox>
      )}

      {stunnedDuration !== 0 && (
        <StatIconBox size={60}>
          <StatIcon stat="stunnedDuration" size={54}></StatIcon>
          <StatCnt size={24}>{stunnedDuration}</StatCnt>
        </StatIconBox>
      )}

      {weakDuration !== 0 && (
        <StatIconBox size={60}>
          <StatIcon stat="weakDuration" size={54}></StatIcon>
          <StatCnt size={24}>{weakDuration}</StatCnt>
        </StatIconBox>
      )}

      {damageModifierDuration !== 0 && (
        <StatIconBox size={60}>
          <StatIcon stat="damageModifierDuration" size={54}></StatIcon>
          <StatCnt size={24}>{weakDuration}</StatCnt>
        </StatIconBox>
      )}

      {shield && (
        <StatIconBox size={60}>
          <StatIcon stat="shield" size={54}></StatIcon>
        </StatIconBox>
      )}
    </StatBarRow>
  );
};

export default StatusLower;
