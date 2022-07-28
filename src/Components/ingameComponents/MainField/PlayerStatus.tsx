import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import { useAppSelector } from "../../../hooks/tsHooks";
import StatusLower from "./StatusLower";
import { Targeting } from "../../../typings/typedb";
import { useEffect, useState } from "react";
import { TeamColorProps } from "../../../typings/typedb";
import { Card } from "../../../typings/typedb";
const PlayerStatus = () => {
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  const targeted = useAppSelector((state) => state.game.game.targetPlayer);
  const data = playersList.pop();
  const selectedCard = useAppSelector(
    (state) => state.game.game.selectForUseCard
  );
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const targetingFunc = (playerId: number) => {
    if (selectedCard.target === "SELECT" && targeted === playerId) return true;
    else if (
      selectedCard.target === "ALLY" &&
      playerId === playersData.PlayerA.playerId
    )
      return true;
    else if (
      selectedCard.target === "ENEMY" &&
      playerId !== playersData.PlayerA.playerId
    )
      return true;
    else if (selectedCard.target === "" && playerId === targeted) return true;
    else {
      return false;
    }
  };
  return (
    <StatusBoxWrap>
      {playersList.map((value, index) => (
        <StatusCard key={index} targeting={targetingFunc(value.playerId)}>
          <StatusUpper>
            <StatusNameTag team={value.team === thisPlayer.team}>
              <span>{value.username}</span>
            </StatusNameTag>
            <span>
              HP {value.health} / MP {value.mana}
            </span>
          </StatusUpper>
          <StatusLower
            manaCostModifierDuration={value.manaCostModifierDuration}
            mutedDuration={value.mutedDuration}
            petrifiedDuration={value.petrifiedDuration}
            poisonedDuration={value.poisonedDuration}
            shield={value.shield}
            sleepDuration={value.sleepDuration}
            stunnedDuration={value.stunnedDuration}
            weakDuration={value.weakDuration}
            damageModifierDuration={value.damageModifierDuration}
          ></StatusLower>
        </StatusCard>
      ))}
    </StatusBoxWrap>
  );
};

const StatusBoxWrap = styled.div`
  width: 20.625vw;
  height: 32.8125vw; // 210px;
  background-color: white;
  ${flex({ direction: "column" })};
  border: 1px solid black;
`;

const StatusCard = styled.div<Targeting>`
  background-color: var(--white);
  width: 20.625vw;
  height: 19.44vw; // 210
  border-bottom: 1px solid black;
  box-shadow: ${({ targeting }) =>
    targeting && `0px 0px 0px 0.5208vw var(--yellow) inset`};
`;

const StatusUpper = styled.div`
  width: 20.625vw;
  height: 3.6458vw;
  box-sizing: border-box;
  padding-top: 0.5208vw;
  padding-left: 1.0416vw;
  ${flex({})};
  font-size: 1.25vw;
  font-family: "국립박물관문화재단클래식M";
`;

const StatusNameTag = styled.div<TeamColorProps>`
  width: 8.02vw;
  height: 2.604vw;
  border-radius: 2.604vw;
  border: 1px solid var(--white);
  margin-right: 1.0416vw;
  color: white;
  box-shadow: 0.104vw 0.208vw 0.208vw rgba(0, 0, 0, 0.25);
  background-color: ${({ team }) =>
    team ? "var(--purple-1)" : "var(--brown-1)"};
  ${flex({ justify: "center", align: "center" })};
`;

export default PlayerStatus;
