import bloodmage from "../../../images/class/BM.png";
import farseer from "../../../images/class/FS.png";
import warock from "../../../images/class/WR.png";
import healer from "../../../images/class/HL.png";

/* character class images-matching func*/
export default function matchProfileImg(data: string) {
  switch (data) {
    case "HEALER":
      return healer;
    case "FARSEER":
      return farseer;
    case "ENCHANTER":
      return warock;
    case "WAROCK":
      return warock;
    case "INVOKER":
      return bloodmage;
    case "BLOODMAGE":
      return bloodmage;
    default:
      return;
  }
}
