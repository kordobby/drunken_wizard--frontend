/* CSS & SC */
import { TimerWrap } from "../InGameStyled/InGameStyled";

const ActionTimer = () => {
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
