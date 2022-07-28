import bloodmage from "../../../images/class/BM1.png";
import farseer from "../../../images/class/FS1.png";
import warock from "../../../images/class/WR1.png";
import healer from "../../../images/class/HL1.png";
import enchanter from "../../../images/class/EC1.png";
import invoker from "../../../images/class/IV1.png";
/* character class images-matching func*/
export default function matchProfileImg(data: string) {
  switch (data) {
    case "HEALER":
      return healer;
    case "FARSEER":
      return farseer;
    case "ENCHANTER":
      return enchanter;
    case "WAROCK":
      return warock;
    case "INVOKER":
      return invoker;
    case "BLOODMAGE":
      return bloodmage;
    default:
      return;
  }
}
