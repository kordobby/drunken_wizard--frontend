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
  ProfileStatBox,
  StatusSizing,
} from "../InGameStyled";

const MyProfile = () => {
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const timerCtrl = useAppSelector((state) => state?.game.game.timer);
  return (
    <>
      {thisPlayer.playerId !== 0 && (
        <ProfileSizing>
          <ProfileStatBox>
            <div className="profile__img">
              <ProfileIcon
                job={thisPlayer.charactorClass}
                dead={thisPlayer.dead}
                team={thisPlayer.team}
              ></ProfileIcon>
              {timerCtrl !== "draw" && <DrawTimer />}
              {timerCtrl === "action" && <ActionTimer />}
            </div>
            <MyStatBox>
              <div className="profile__stats">
                <span className="profile__title">HP {thisPlayer.health}</span>
                <MyStatBar stat={true} point={(thisPlayer.health / 20) * 21.35}>
                  <div className="stat__full">
                    <div className="stat__now"></div>
                  </div>
                </MyStatBar>
              </div>
              <div className="profile__stats">
                <span className="profile__title">MP {thisPlayer.mana}</span>
                <MyStatBar stat={false} point={(thisPlayer.mana / 20) * 21.35}>
                  <div className="stat__full">
                    <div className="stat__now"></div>
                  </div>
                </MyStatBar>
              </div>
            </MyStatBox>
          </ProfileStatBox>
          <StatusSizing></StatusSizing>
        </ProfileSizing>
      )}
    </>
  );
};

export default MyProfile;
