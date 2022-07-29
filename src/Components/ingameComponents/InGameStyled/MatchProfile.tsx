import bloodmage from "../../../images/class/BM1.webp";
import farseer from "../../../images/class/FS1.webp";
import warock from "../../../images/class/WR1.webp";
import healer from "../../../images/class/HL1.webp";
import enchanter from "../../../images/class/EC1.webp";
import invoker from "../../../images/class/IV1.webp";
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
