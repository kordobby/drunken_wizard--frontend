/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* CSS & SC */
import { CraveWrap } from "../InGameStyled";

const CraveField = () => {
  console.log("렌더링 테스트: Crave Component");
  const Crave = useAppSelector((state) => state.game.game.cardCrave);
  return (
    <CraveWrap>
      <span>카드무덤</span>
      <span>{Crave}</span>
    </CraveWrap>
  );
};

export default CraveField;
