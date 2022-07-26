import bloodmage from "../../../images/class/BLOODMAGE.png";
import farseer from "../../../images/class/FARSEER.png";
import warock from "../../../images/class/WAROCK.png";
import healer from "../../../images/class/HEALER.png";

/* character class images-matching func*/
export default function matchClassImg(data: string) {
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
      return warock;
  }
}
