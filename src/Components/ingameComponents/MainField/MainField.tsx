import PlayerIcons from "./PlayerIcons";
import OthersStates from "./OthersStates";
import { MainProps } from "../../../typings/typedb";
const MainField = ({
  enemyPlayerA,
  enemyPlayerB,
  teamPlayer,
  thisPlayer,
}: MainProps) => {
  return (
    <div style={{ display: "flex", justifyItems: "center" }}>
      <OthersStates
        enemyPlayerA={enemyPlayerA}
        enemyPlayerB={enemyPlayerB}
        teamPlayer={teamPlayer}
        thisPlayer={thisPlayer}
      ></OthersStates>
      <PlayerIcons
        enemyPlayerA={enemyPlayerA}
        enemyPlayerB={enemyPlayerB}
        teamPlayer={teamPlayer}
        thisPlayer={thisPlayer}
      ></PlayerIcons>
    </div>
  );
};

export default MainField;
