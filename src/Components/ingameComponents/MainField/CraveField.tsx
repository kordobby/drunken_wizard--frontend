/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* CSS & SC */
import { CraveWrap } from "../InGameStyled";

const CraveField = () => {
  const Crave = useAppSelector((state) => state.game.game.cardCrave);
  return (
    <CraveWrap>
      <span>카드무덤</span>
      <span>{Crave}</span>
    </CraveWrap>
  );
};

export default CraveField;
