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
          <ProfilesImage job={value.charactorClass}></ProfilesImage>
          <span>{value.username}</span>
          <div>
            <StatBarTop>
              <p>{value.charactorClass}</p>
              <p>HP :{value.health}</p>
              <p>MP :{value.mana}</p>
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
