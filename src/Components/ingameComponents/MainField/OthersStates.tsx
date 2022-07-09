import { MainProps } from "../../../typings/typedb";
import styled from "styled-components";
import flex from "../../GlobalStyled/flex";

const OthersStates = ({
  enemyPlayerA,
  enemyPlayerB,
  teamPlayer,
  thisPlayer,
}: MainProps) => {
  return (
    <StatsField>
      <PlayersStatField>
        <span>{thisPlayer.playerId}</span>
        <span>HP: {thisPlayer.health} </span>
        <span>MP: {thisPlayer.mana}</span>
        <span>stats: {thisPlayer.turnOrder}</span>
      </PlayersStatField>
      <PlayersStatField>
        <span>{enemyPlayerA.playerId}</span>
        <span>HP: {enemyPlayerA.health}</span>
        <span>MP: {enemyPlayerA.mana}</span>
        <span>stats: {enemyPlayerA.turnOrder}</span>
      </PlayersStatField>
      <PlayersStatField>
        <span>{teamPlayer.playerId}</span>
        <span>HP: {teamPlayer.health}</span>
        <span>MP: {teamPlayer.mana}</span>
        <span>stats: {teamPlayer.turnOrder}</span>
      </PlayersStatField>
      <PlayersStatField>
        <span>{enemyPlayerB.playerId}</span>
        <span>HP: {enemyPlayerB.health}</span>
        <span>MP: {enemyPlayerB.mana}</span>
        <span>stats: {enemyPlayerB.turnOrder}</span>
      </PlayersStatField>
    </StatsField>
  );
};

const StatsField = styled.div`
  width: 200px;
  background-color: beige;
  margin-right: 50px;
  ${flex({ direction: "column", align: "center", justify: "center" })};
`;

const PlayersStatField = styled.div`
  width: 200px;
  background-color: yellow;
  ${flex({ direction: "column", align: "center", justify: "center" })};
  margin-bottom: 20px;
`;
export default OthersStates;