/* CSS & SC */
import { TimerWrap } from "../InGameStyled";

const DrawTimer = () => {
  console.log("렌더링 테스트: Draw Timer Component");
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
