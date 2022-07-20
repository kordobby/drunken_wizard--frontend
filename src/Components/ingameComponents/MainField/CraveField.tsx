/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* CSS & SC */
import { CraveWrap } from "../InGameStyled";

const CraveField = () => {
  // const Crave = useAppSelector((state) => state.game.game.cardCrave);
  return (
    <CraveWrap>
      <div className="crave__under"></div>
      <div className="crave__top"></div>
      {/* <span>{Crave}</span> */}
    </CraveWrap>
  );
};

export default CraveField;
