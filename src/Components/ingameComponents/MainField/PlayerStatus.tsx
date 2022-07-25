import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import { useAppSelector } from "../../../hooks/tsHooks";
import StatusLower from "./StatusLower";
import { Targeting } from "../../../typings/typedb";
import { useEffect, useState } from "react";
import { TeamColorProps } from "../../../typings/typedb";
const PlayerStatus = () => {
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  const targeted = useAppSelector((state) => state.game.game.targetPlayer);
  const data = playersList.pop();
  const [targetTypes, setTargetTypes] = useState<boolean>(false);
  useEffect(() => {}, [targeted]);

  const types = useAppSelector((state) => state.game.game.cardType);
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  console.log(types);
  return (
    <StatusBoxWrap>
      {playersList.map((value) => (
        <StatusCard targeting={targeted === value.playerId}>
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
  width: 396px;
  height: 630px; // 210px;
  background-color: white;
  ${flex({ direction: "column" })};
  border: 1px solid black;
`;

const StatusCard = styled.div<Targeting>`
  background-color: var(--white);
  width: 396px;
  height: 210px; // 210
  border-bottom: 1px solid black;
  box-shadow: ${({ targeting }) =>
    targeting && `0px 0px 0px 10px var(--yellow) inset`};
`;

const StatusUpper = styled.div`
  width: 396px;
  height: 70px;
  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 20px;
  ${flex({})};
  font-size: 24px;
  font-family: "국립박물관문화재단클래식M";
`;

const StatusNameTag = styled.div<TeamColorProps>`
  width: 154px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid var(--white);
  margin-right: 20px;
  color: white;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ team }) =>
    team ? "var(--purple-1)" : "var(--brown-1)"};
  ${flex({ justify: "center", align: "center" })};
`;

export default PlayerStatus;
