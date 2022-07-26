import bloodmage from "../../../images/class/BM.png";
import farseer from "../../../images/class/FS.png";
import warock from "../../../images/class/WR.png";
import healer from "../../../images/class/HL.png";
import enchanter from "../../../images/class/EC.png";
import invoker from "../../../images/class/IV.png";
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
