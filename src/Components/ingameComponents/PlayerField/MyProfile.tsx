/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Components */
import ActionTimer from "./ActionTimer";
import DrawTimer from "./DrawTimer";

/* CSS & SC */
import { ProfileSizing, ProfileIcon } from "../InGameStyled";

const MyProfile = () => {
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const timerCtrl = useAppSelector((state) => state?.game.game.timer);
  return (
    <>
      <ProfileSizing>
        <ProfileIcon job={thisPlayer.charactorClass}></ProfileIcon>
        <div style={{ marginTop: "10px", color: "white" }}>
          <p>{thisPlayer.charactorClass}</p>
          <p>HP : {thisPlayer.health}</p>
          <p>MP : {thisPlayer.mana}</p>
        </div>
        {timerCtrl === "draw" && <DrawTimer />}
        {timerCtrl === "action" && <ActionTimer />}
      </ProfileSizing>
    </>
  );
};

export default MyProfile;
