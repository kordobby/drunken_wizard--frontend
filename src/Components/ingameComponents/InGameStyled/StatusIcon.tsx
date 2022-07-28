import shield from "../../../images/statIcon/S1.png";
import sleepDuration from "../../../images/statIcon/S2.png";
import stunnedDuration from "../../../images/statIcon/S3.png";
import muteDuration from "../../../images/statIcon/S4.png";
import poisonedDuration from "../../../images/statIcon/S5.png";
import weakDuration from "../../../images/statIcon/S6.png";
import petrifiedDuration from "../../../images/statIcon/S7.png";
import damageModifierDuration from "../../../images/statIcon/S8.png";
export default function matchStatusImg(data: string) {
  switch (data) {
    case "sleepDuration":
      return sleepDuration;
    case "mutedDuration":
      return muteDuration;
    case "petrifiedDuration":
      return petrifiedDuration;
    case "poisonedDuration":
      return poisonedDuration;
    case "stunnedDuration":
      return stunnedDuration;
    case "weakDuration":
      return weakDuration;
    case "damageModifierDuration":
      return damageModifierDuration;
    case "shield":
      return shield;
    default:
      return;
  }
}
