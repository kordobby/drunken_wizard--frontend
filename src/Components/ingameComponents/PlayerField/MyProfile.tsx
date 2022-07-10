import styled from "styled-components";
import { ProfileSizing, ProfileIcon } from "../InGameStyled";
import { useAppSelector } from "../../../hooks/tsHooks";

const MyProfile = () => {
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);

  return (
    <ProfileSizing>
      <ProfileIcon job={thisPlayer.charactorClass}></ProfileIcon>
      <div style={{ marginTop: "10px", color: "white" }}>
        <span>HP : {thisPlayer.health}</span>
        <span>MP : {thisPlayer.mana}</span>
      </div>
    </ProfileSizing>
  );
};

export default MyProfile;
