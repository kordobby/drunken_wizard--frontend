/* CSS & SC */
import { TimerWrap } from "../InGameStyled/InGameStyled";

const DrawTimer = () => {
  return (
    <TimerWrap>
      <div className="circle_progress">
        <div className="left">
          <div className="bar"></div>
        </div>
        <div className="right">
          <div className="bar"></div>
        </div>
      </div>
    </TimerWrap>
  );
};

export default DrawTimer;
