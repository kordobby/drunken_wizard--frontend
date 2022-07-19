/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Components */
import ActionTimer from "./ActionTimer";
import DrawTimer from "./DrawTimer";

/* CSS & SC */
import { ProfileSizing, ProfileIcon, MyStatBar } from "../InGameStyled";

const MyProfile = () => {
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const timerCtrl = useAppSelector((state) => state?.game.game.timer);
  return (
    <>
      <ProfileSizing>
        <ProfileIcon
          job={thisPlayer.charactorClass}
          dead={thisPlayer.dead}
        ></ProfileIcon>
        <div className="profile__stats">
          <div>
            <span>HP:</span>
            <MyStatBar stat="hp" point={thisPlayer.health}>
              <div className="stat__full"></div>
              <div className="stat__now"></div>
            </MyStatBar>
          </div>
        </div>
        {/* <div style={{ marginTop: "20px", color: "white" }}>
          <p style={{ marginRight: "15px" }}>
            player{thisPlayer.charactorClass}
          </p>
          <span style={{ marginRight: "15px" }}>HP : {thisPlayer.health}</span>
          <span>MP : {thisPlayer.mana}</span>
        </div> */}
        {timerCtrl === "draw" && <DrawTimer />}
        {timerCtrl === "action" && <ActionTimer />}
      </ProfileSizing>
    </>
  );
};

export default MyProfile;
