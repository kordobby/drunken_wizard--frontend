import bloodmage from "../../../images/class/BLOODMAGE.webp";
import farseer from "../../../images/class/FARSEER.webp";
import warock from "../../../images/class/WAROCK.webp";
import healer from "../../../images/class/HEALER.webp";
import enchanter from "../../../images/class/ENCHANTER.webp";
import invoker from "../../../images/class/INVOKER.webp";
/* character class images-matching func*/
export default function matchClassImg(data: string) {
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
      return invoker;
  }
}
