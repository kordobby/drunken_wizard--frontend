import { useState, useCallback } from "react";

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
  CoverIconMine,
} from "../InGameStyled/InGameStyled";

const MyProfile = () => {
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const timerCtrl = useAppSelector((state) => state?.game.game.timer);
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const MouseOverFunc = useCallback(() => {
    setMouseOver(true);
  }, [mouseOver]);

  const MouseLeaveFunc = useCallback(() => {
    setMouseOver(false);
  }, [mouseOver]);

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
                {thisPlayer.health > 0 ? (
                  <span className="profile__title">HP{thisPlayer.health}</span>
                ) : (
                  <span className="profile__title">HP 0</span>
                )}
                {thisPlayer.health >= 20 ? (
                  <MyStatBar stat={true} point={16.35}>
                    <div className="stat__full">
                      <div className="stat__now"></div>
                    </div>
                  </MyStatBar>
                ) : (
                  <MyStatBar
                    stat={true}
                    point={(thisPlayer.health / 20) * 16.35}
                  >
                    <div className="stat__full">
                      <div className="stat__now"></div>
                    </div>
                  </MyStatBar>
                )}
              </div>
              <div className="profile__stats">
                {thisPlayer.mana > 0 ? (
                  <span className="profile__title">MP{thisPlayer.mana}</span>
                ) : (
                  <span className="profile__title">MP 0</span>
                )}

                {thisPlayer.mana >= 20 ? (
                  <MyStatBar stat={false} point={16.35}>
                    <div className="stat__full">
                      <div className="stat__now"></div>
                    </div>
                  </MyStatBar>
                ) : (
                  <MyStatBar
                    stat={false}
                    point={(thisPlayer.mana / 20) * 16.35}
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
                  value={thisPlayer.sleepDuration}
                  stat="sleepDuration"
                  size={3.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {thisPlayer.sleepDuration > 0 ? (
                    <>{mouseOver && <CoverIconMine>수면</CoverIconMine>}</>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIconMine>
                          수면
                          <br />
                          저항
                        </CoverIconMine>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={1.083}>
                  {Math.abs(thisPlayer.sleepDuration)}
                </StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.mutedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  value={thisPlayer.mutedDuration}
                  stat="mutedDuration"
                  size={3.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {thisPlayer.mutedDuration > 0 ? (
                    <>{mouseOver && <CoverIconMine>침묵</CoverIconMine>}</>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIconMine>
                          침묵
                          <br />
                          저항
                        </CoverIconMine>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={1.083}>
                  {Math.abs(thisPlayer.mutedDuration)}
                </StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.petrifiedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  value={thisPlayer.petrifiedDuration}
                  stat="petrifiedDuration"
                  size={3.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {thisPlayer.petrifiedDuration > 0 ? (
                    <>{mouseOver && <CoverIconMine>석화</CoverIconMine>}</>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIconMine>
                          석화
                          <br />
                          저항
                        </CoverIconMine>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={1.083}>
                  {Math.abs(thisPlayer.petrifiedDuration)}
                </StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.poisonedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  value={thisPlayer.petrifiedDuration}
                  stat="poisonedDuration"
                  size={3.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {thisPlayer.poisonedDuration > 0 ? (
                    <>{mouseOver && <CoverIconMine>중독</CoverIconMine>}</>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIconMine>
                          중독
                          <br />
                          저항
                        </CoverIconMine>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={1.083}>
                  {Math.abs(thisPlayer.poisonedDuration)}
                </StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.stunnedDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  value={thisPlayer.stunnedDuration}
                  stat="stunnedDuration"
                  size={3.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {thisPlayer.stunnedDuration > 0 ? (
                    <>{mouseOver && <CoverIconMine>기절</CoverIconMine>}</>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIconMine>
                          기절
                          <br />
                          저항
                        </CoverIconMine>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={1.083}>
                  {Math.abs(thisPlayer.stunnedDuration)}
                </StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.weakDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  value={thisPlayer.weakDuration}
                  stat="weakDuration"
                  size={3.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {thisPlayer.weakDuration < 0 ? (
                    <>{mouseOver && <CoverIconMine>방어</CoverIconMine>}</>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIconMine>
                          약점
                          <br />
                          노출
                        </CoverIconMine>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={1.083}>
                  {Math.abs(thisPlayer.weakDuration)}
                </StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.damageModifierDuration !== 0 && (
              <MyStatIcon>
                <StatIcon
                  value={-thisPlayer.damageModifierDuration}
                  stat={"damageModifierDuration"}
                  size={3.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {thisPlayer.damageModifierDuration > 0 ? (
                    <>
                      {mouseOver && (
                        <CoverIconMine>
                          마법
                          <br />
                          증폭
                        </CoverIconMine>
                      )}
                    </>
                  ) : (
                    <>
                      {mouseOver && (
                        <CoverIconMine>
                          마법
                          <br />
                          약화
                        </CoverIconMine>
                      )}
                    </>
                  )}
                </StatIcon>
                <StatCnt size={1.083}>
                  {Math.abs(thisPlayer.damageModifierDuration)}
                </StatCnt>
              </MyStatIcon>
            )}

            {thisPlayer.shield === true && (
              <MyStatIcon>
                <StatIcon
                  value={-1}
                  stat="shield"
                  size={3.6875}
                  mouseOver={mouseOver}
                  onMouseOver={MouseOverFunc}
                  onMouseLeave={MouseLeaveFunc}
                >
                  {mouseOver && <CoverIconMine>실드</CoverIconMine>}
                </StatIcon>
              </MyStatIcon>
            )}
          </StatusSizing>
        </ProfileSizing>
      )}
    </>
  );
};

export default MyProfile;
