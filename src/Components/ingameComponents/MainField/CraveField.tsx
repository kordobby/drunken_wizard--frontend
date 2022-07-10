import { Profiles } from "../InGameStyled";
import { useAppSelector } from "../../../hooks/tsHooks";
const CraveField = () => {
  const Crave = useAppSelector((state) => state.game.game.cardCrave);
  return (
    <Profiles
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>카드무덤</span>
      <span>{Crave}</span>
    </Profiles>
  );
};

export default CraveField;
