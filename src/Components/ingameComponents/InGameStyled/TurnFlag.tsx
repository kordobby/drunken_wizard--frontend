import flagIcon from "../../../images/playerfield/beerFlag.png";
import drawIcon from "../../../images/playerfield/drawingCards.png";
import ingIcon from "../../../images/playerfield/playing.png";

export default function matchFlagImg(data: string) {
  switch (data) {
    case "PRECHECK":
      return flagIcon;
    case "DRAW":
      return drawIcon;
    case "ACTION":
      return ingIcon;
    case "ACTIONFAILED":
      return ingIcon;
    case "USECARD":
      return ingIcon;
    case "USECARDSUCCESS":
      return ingIcon;
    case "DISCARD":
      return ingIcon;
    case "CHANGETURN":
      return flagIcon;
    default:
      return;
  }
}
