/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Modules */
import { playersSetting } from "../../../typings/typedb";

/* CSS & SC */
import PlayerStatBar from "./PlayerStatBar";
import {
  PlayerIconsFields,
  Profiles,
  ProfilesImage,
  StatBarTop,
  PlayerNameTag,
} from "../InGameStyled";

const PlayerIcons = () => {
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayerId);

  return (
    <PlayerIconsFields>
      {/* 여기 줄일방ㅇ법... */}
      {playersList.map((value: playersSetting) => (
        <Profiles team={value.team} playing={value.playerId === nowPlayer}>
          <ProfilesImage job={value.charactorClass} dead={value.dead}>
            <PlayerNameTag>
              <span>hello</span>
              <span>{value.username}</span>
            </PlayerNameTag>
          </ProfilesImage>
          <div>
            <StatBarTop>
              <p>Class: {value.charactorClass}</p>
              <span>HP :{value.health}</span>
              <span style={{ marginLeft: "40px" }}>MP :{value.mana}</span>
            </StatBarTop>
            <PlayerStatBar
              manaCostModifierDuration={value.manaCostModifierDuration}
              mutedDuration={value.mutedDuration}
              petrifiedDuration={value.petrifiedDuration}
              poisonedDuration={value.poisonedDuration}
              shield={value.shield}
              sleepDuration={value.sleepDuration}
              stunnedDuration={value.stunnedDuration}
              weakDuration={value.weakDuration}
              damageModifierDuration={value.damageModifierDuration}
            ></PlayerStatBar>
          </div>
        </Profiles>
      ))}
    </PlayerIconsFields>
  );
};

export default PlayerIcons;
