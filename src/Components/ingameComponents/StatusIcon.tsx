import shield from "../../Public/Images/shield.png";
import sleepDuration from "../../Public/Images/sleepDuration.png";
import stunnedDuration from "../../Public/Images/stunnedDuration.png";
import muteDuration from "../../Public/Images/muteDuration.png";
import poisonedDuration from "../../Public/Images/poisonedDuration.png";
import weakDuration from "../../Public/Images/weakDuration.png";
import manaCostModifierDuration from "../../Public/Images/manaCostModifierDuration.png";
import damageModifierDuration from "../../Public/Images/damageModifierDuration.png";
export default function matchStatusImg(data: string) {
  switch (data) {
    case "shield":
      return shield;
    case "sleepDuration":
      return sleepDuration;
    case "stunnedDuration":
      return stunnedDuration;
    case "mutedDuration":
      return muteDuration;
    case "poisonedDuration":
      return poisonedDuration;
    case "weakDuration":
      return weakDuration;
    case "petrifiedDuration":
      return manaCostModifierDuration;
    case "damageModifierDuration":
      return damageModifierDuration;
    default:
      return;
  }
}
