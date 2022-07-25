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
  MyStatIcon,
  StatIcon,
  StatCnt,
} from "../InGameStyled/InGameStyled";

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
                size={360}
                reverse={false}
              ></ProfileIcon>
              {timerCtrl === "draw" && <DrawTimer />}
              {timerCtrl === "action" && <ActionTimer />}
            </div>
            <MyStatBox>
              <div className="profile__stats">
                <span className="profile__title">HP {thisPlayer.health}</span>
                {thisPlayer.health >= 20 ? (
                  <MyStatBar stat={true} point={21.35}>
                    <div className="stat__full">
                      <div className="stat__now"></div>
                    </div>
                  </MyStatBar>
                ) : (
                  <MyStatBar
                    stat={true}
                    point={(thisPlayer.health / 20) * 21.35}
                  >
                    <div className="stat__full">
                      <div className="stat__now"></div>
                    </div>
                  </MyStatBar>
                )}
              </div>
              <div className="profile__stats">
                <span className="profile__title">MP {thisPlayer.mana}</span>
                {thisPlayer.mana >= 20 ? (
                  <MyStatBar stat={false} point={21.35}>
                    <div className="stat__full">
                      <div className="stat__now"></div>
                    </div>
                  </MyStatBar>
                ) : (
                  <MyStatBar
                    stat={false}
                    point={(thisPlayer.mana / 20) * 21.35}
                  >
                    <div className="stat__full">
                      <div className="stat__now"></div>
                    </div>
                  </MyStatBar>
                )}
              </div>
            </MyStatBox>
          </ProfileStatBox>
          <StatusSizing>
            {thisPlayer.sleepDuration !== 0 && (
              <MyStatIcon>
                <StatIcon stat="sleepDuration" size={90}></StatIcon>
                <StatCnt size={40}>{thisPlayer.sleepDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.mutedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon stat="mutedDuration" size={90}></StatIcon>
                <StatCnt size={40}>{thisPlayer.mutedDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.petrifiedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon stat="petrifiedDuration" size={90}></StatIcon>
                <StatCnt size={40}>{thisPlayer.petrifiedDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.poisonedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon stat="poisonedDuration" size={90}></StatIcon>
                <StatCnt size={40}>{thisPlayer.poisonedDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.stunnedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon stat="stunnedDuration" size={90}></StatIcon>
                <StatCnt size={40}>{thisPlayer.stunnedDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.weakDuration !== 0 && (
              <MyStatIcon>
                <StatIcon stat="weakDuration" size={90}></StatIcon>
                <StatCnt size={40}>{thisPlayer.weakDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.damageModifierDuration !== 0 && (
              <MyStatIcon>
                <StatIcon stat="damageModifierDuration" size={90}></StatIcon>
                <StatCnt size={40}>{thisPlayer.weakDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.shield && (
              <MyStatIcon>
                <StatIcon stat="shield" size={90}></StatIcon>
              </MyStatIcon>
            )}
          </StatusSizing>
        </ProfileSizing>
      )}
    </>
  );
};

export default MyProfile;
