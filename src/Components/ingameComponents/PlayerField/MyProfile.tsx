/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Components */
import ActionTimer from "./ActionTimer";
import DrawTimer from "./DrawTimer";

/* CSS & SC */
import {
  ProfileSizing,
  ProfileIcon,
  MyStatBar,
  MyStatBox,
} from "../InGameStyled";

const MyProfile = () => {
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const timerCtrl = useAppSelector((state) => state?.game.game.timer);
  return (
    <>
      {thisPlayer.playerId !== 0 && (
        <ProfileSizing>
          <div className="profile__img">
            <ProfileIcon
              job={thisPlayer.charactorClass}
              dead={thisPlayer.dead}
            ></ProfileIcon>
            {timerCtrl !== "draw" && <DrawTimer />}
            {timerCtrl === "action" && <ActionTimer />}
          </div>
          <MyStatBox>
            <div className="profile__stats">
              <span className="profile__title">HP</span>
              <MyStatBar stat={true} point={thisPlayer.health}>
                <div className="stat__full">
                  <div className="stat__now"></div>
                </div>
              </MyStatBar>
            </div>
            <div className="profile__stats">
              <span className="profile__title">MP</span>
              <MyStatBar stat={false} point={(thisPlayer.mana / 20) * 21.35}>
                <div className="stat__full">
                  <div className="stat__now"></div>
                </div>
              </MyStatBar>
            </div>
          </MyStatBox>
        </ProfileSizing>
      )}
    </>
  );
};

export default MyProfile;
