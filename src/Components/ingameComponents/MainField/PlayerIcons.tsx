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
  PlayerProfilesIcon,
  PlayerPointBox,
  PlayerProfileBox,
  PlayerPointBar,
} from "../InGameStyled";

const PlayerIcons = () => {
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  const data = playersList.shift();
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayerId);

  return (
    <>
      <PlayerIconsFields>
        {/* 여기 줄일방ㅇ법... */}
        {playersList.map((value: playersSetting, index: number) => (
          <Profiles team={value.team} playing={value.playerId === nowPlayer}>
            <PlayerProfileBox>
              <PlayerProfilesIcon>
                <ProfilesImage
                  team={value.team}
                  job={value.charactorClass}
                  dead={value.dead}
                >
                  <PlayerNameTag team={value.team}>
                    <span>{value.username}</span>
                  </PlayerNameTag>
                </ProfilesImage>
              </PlayerProfilesIcon>
              <PlayerPointBox>
                <PlayerPointBar
                  stat={true}
                  point={(value.health / 20) * 10.416}
                >
                  <span>HP {value.health}</span>
                  <div className="stat__full">
                    <div className="stat__now"></div>
                  </div>
                </PlayerPointBar>
                <PlayerPointBar stat={false} point={(value.mana / 20) * 10.416}>
                  <span>MP {value.mana}</span>
                  <div className="stat__full">
                    <div className="stat__now"></div>
                  </div>
                </PlayerPointBar>
              </PlayerPointBox>
            </PlayerProfileBox>
            <div>
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
    </>
  );
};

export default PlayerIcons;
