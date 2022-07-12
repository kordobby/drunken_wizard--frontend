import { CraveWrap } from "../InGameStyled";
import { useAppSelector } from "../../../hooks/tsHooks";

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
