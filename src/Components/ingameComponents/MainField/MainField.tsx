import PlayerIcons from "./PlayerIcons";
import CraveField from "./CraveField";
const MainField = () => {
  return (
    <div
      style={{
        height: "330px",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {/* <OthersStates></OthersStates> */}
      <PlayerIcons></PlayerIcons>
      <CraveField></CraveField>
    </div>
  );
};

export default MainField;
