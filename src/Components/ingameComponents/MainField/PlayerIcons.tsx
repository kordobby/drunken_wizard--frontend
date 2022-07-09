import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import matchClassImg from "../InGameStyled";
import { PlayerIconsFields, Profiles, PlayerNameTag } from "../InGameStyled";
import { IconsImgProps } from "../../../typings/typedb";
import { MainProps } from "../../../typings/typedb";
import { stringify } from "querystring";
const PlayerIcons = ({
  enemyPlayerA,
  enemyPlayerB,
  teamPlayer,
  thisPlayer,
}: MainProps) => {
  return (
    <PlayerIconsFields>
      <Profiles>
        <ProfilesImage job={enemyPlayerA.charactorClass}></ProfilesImage>
        <span>{enemyPlayerA.username}</span>
      </Profiles>
      <Profiles>
        <ProfilesImage job={enemyPlayerB.charactorClass}></ProfilesImage>
        <span>{enemyPlayerB.username}</span>
      </Profiles>
      <Profiles>
        <ProfilesImage job={teamPlayer.charactorClass}></ProfilesImage>
        <span>{teamPlayer.username}</span>
      </Profiles>
      <Profiles>
        <ProfilesImage job={thisPlayer.charactorClass}></ProfilesImage>
        <span>{thisPlayer.username}</span>
      </Profiles>
    </PlayerIconsFields>
  );
};
export const ProfilesImage = styled.div<IconsImgProps>`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-size: cover;
  background-image: url(${(props) => matchClassImg(props.job)});
  margin-bottom: 10px;
  ${flex({ justify: "center", align: "center" })}
`;
export default PlayerIcons;
