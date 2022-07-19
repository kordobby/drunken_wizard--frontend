/* CSS & SC */
import { TimerWrap } from "../InGameStyled";

const ActionTimer = () => {
  console.log("렌더링 테스트: Action timer Component");
  return (
    <TimerWrap>
      <div className="circle_progress-action">
        <div className="left-action">
          <div className="bar-action"></div>
        </div>
        <div className="right-action">
          <div className="bar-action"></div>
        </div>
      </div>
    </TimerWrap>
  );
};

export default ActionTimer;
