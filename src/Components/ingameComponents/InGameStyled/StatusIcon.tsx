import shield from "../../../images/statIcon/S1.webp";
import sleepDuration from "../../../images/statIcon/S2.webp";
import stunnedDuration from "../../../images/statIcon/S3.webp";
import muteDuration from "../../../images/statIcon/S4.webp";
import poisonedDuration from "../../../images/statIcon/S5.webp";
import weakDuration from "../../../images/statIcon/S6.webp";
import petrifiedDuration from "../../../images/statIcon/S7.webp";
import damageModifierDuration from "../../../images/statIcon/S8.webp";
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
