import { useState } from "react";
import { useCallback } from "react";
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
  CoverIcon,
} from "../InGameStyled/InGameStyled";

const MyProfile = () => {
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const timerCtrl = useAppSelector((state) => state?.game.game.timer);
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const MouseOverFunc = useCallback(() => {
    setMouseOver(true);
    console.log("짠");
  }, [mouseOver]);

  const MouseLeaveFunc = useCallback(() => {
    setMouseOver(false);
    console.log("짠");
  }, [mouseOver]);

  const weakDurationFunc = (value: number) => {
    if (value > 0) return "weakDuration";
    else return "antiWeakDuration";
  };

  const damageModifierFunc = (value: number) => {
    if (value > 0) return "damageModifierDuration";
    else return "antiDamageModifierDuration";
  };
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
                <StatIcon
                  stat="sleepDuration"
                  size={4.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {mouseOver && <CoverIcon>수면</CoverIcon>}
                </StatIcon>
                <StatCnt size={2.083}>{thisPlayer.sleepDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.mutedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  stat="mutedDuration"
                  size={4.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {mouseOver && <CoverIcon>침묵</CoverIcon>}
                </StatIcon>
                <StatCnt size={2.083}>{thisPlayer.mutedDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.petrifiedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  stat="petrifiedDuration"
                  size={4.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {mouseOver && <CoverIcon>석화</CoverIcon>}
                </StatIcon>
                <StatCnt size={2.083}>{thisPlayer.petrifiedDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.poisonedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  stat="poisonedDuration"
                  size={4.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {mouseOver && <CoverIcon>독</CoverIcon>}
                </StatIcon>
                <StatCnt size={2.083}>{thisPlayer.poisonedDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.stunnedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  stat="stunnedDuration"
                  size={4.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {mouseOver && <CoverIcon>기절</CoverIcon>}
                </StatIcon>
                <StatCnt size={2.083}>{thisPlayer.stunnedDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.weakDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  stat={weakDurationFunc(thisPlayer.weakDuration)}
                  size={4.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {thisPlayer.weakDuration > 0 ? (
                    <>{mouseOver && <CoverIcon>방어</CoverIcon>}</>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIcon>
                          약점
                          <br />
                          노출
                        </CoverIcon>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={2.083}>{thisPlayer.weakDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.damageModifierDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  stat={damageModifierFunc(thisPlayer.damageModifierDuration)}
                  size={4.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {" "}
                  {thisPlayer.damageModifierDuration > 0 ? (
                    <>
                      {mouseOver && (
                        <CoverIcon>
                          마법
                          <br />
                          증폭
                        </CoverIcon>
                      )}
                    </>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIcon>
                          마법
                          <br />
                          약화
                        </CoverIcon>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={2.083}>{thisPlayer.weakDuration}</StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.shield && (
              <MyStatIcon>
                <StatIcon
                  stat="shield"
                  size={4.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                ></StatIcon>
              </MyStatIcon>
            )}
          </StatusSizing>
        </ProfileSizing>
      )}
    </>
  );
};

export default MyProfile;
