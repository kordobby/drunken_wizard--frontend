import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import matchClassImg from "../InGameStyled";
import { PlayerIconsFields, Profiles } from "../InGameStyled";
import { IconsImgProps } from "../../../typings/typedb";
import { useAppSelector } from "../../../hooks/tsHooks";
import { playersSetting } from "../../../typings/typedb";
import PlayerStatBar from "./PlayerStatBar";
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
export const ProfilesImage = styled.div<IconsImgProps>`
  width: 120px;
  height: 130px;
  border-radius: 40px;
  background-size: cover;
  background-image: url(${(props) => matchClassImg(props.job)});
  margin-bottom: 10px;
  ${flex({ justify: "center", align: "center" })}
`;

const StatBarTop = styled.div`
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
`;

export default PlayerIcons;
