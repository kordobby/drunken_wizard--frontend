import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import { useAppSelector } from "../../../hooks/tsHooks";
import StatusLower from "./StatusLower";

const PlayerStatus = () => {
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  const data = playersList.shift();

  return (
    <StatusBoxWrap>
      {playersList.map((value) => (
        <StatusCard>
          <StatusUpper>
            <StatusNameTag>
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

const StatusCard = styled.div`
  background-color: yellow;
  width: 396px;
  height: 210px; // 210
  border-bottom: 1px solid black;
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

const StatusNameTag = styled.div`
  width: 154px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid tomato;
  margin-right: 20px;
  ${flex({ justify: "center", align: "center" })};
`;

export default PlayerStatus;
