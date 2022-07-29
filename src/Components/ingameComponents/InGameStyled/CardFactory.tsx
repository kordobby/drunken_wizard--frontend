import flipped from "../../../images/cardsBack/commonBack.webp";

import boulderStrike from "../../../images/cards/attack/boulderStrike.webp";
import deathRay from "../../../images/cards/attack/deathRay.webp";
import beerMug from "../../../images/cards/item/beerMug.webp";
import fireBall from "../../../images/cards/attack/fireBall.webp";
import leftOverOctopus from "../../../images/cards/item/leftOverOctopus.webp";
import magicMissile from "../../../images/cards/attack/magicMissile.webp";
import manaPotion from "../../../images/cards/item/manaPotion.webp";
import manaSiphon from "../../../images/cards/attack/manaSiphon.webp";
import panacea from "../../../images/cards/item/panacea.webp";
import poisonArrow from "../../../images/cards/attack/poisonArrow.webp";
import magicAttenuation from "../../../images/cards/curse/magicAttenuation.webp";
import mute from "../../../images/cards/curse/mute.webp";
import petrification from "../../../images/cards/curse/petrification.webp";
import sleep from "../../../images/cards/curse/sleep.webp";
import venom from "../../../images/cards/curse/venom.webp";
import weaknessExposure from "../../../images/cards/curse/weaknessExposure.webp";
import yfeputs from "../../../images/cards/curse/yfeputs.webp";
import channelingMana from "../../../images/cards/enchant/channelingMana.webp";
import dispel from "../../../images/cards/enchant/dispel.webp";
import heal from "../../../images/cards/enchant/heal.webp";
import magicAmplication from "../../../images/cards/enchant/magicAmplication.webp";
import magicArmor from "../../../images/cards/enchant/magicArmor.webp";
import partyHeal from "../../../images/cards/enchant/partyHeal.webp";
import resistance from "../../../images/cards/enchant/resistance.webp";
import shield from "../../../images/cards/enchant/shield.webp";

export default function matchCardImg(data: string) {
  switch (data) {
    case "Boulder Strike": //
      return boulderStrike;
    case "Death Ray":
      return deathRay;
    case "Fire Ball":
      return fireBall;
    case "Magic Missile":
      return magicMissile;
    case "Mana Siphon":
      return manaSiphon;
    case "Poison Arrow":
      return poisonArrow;
    case "Mute":
      return mute;
    case "Petrification":
      return petrification;
    case "Weakness Exposure":
      return weaknessExposure;
    case "Venom":
      return venom;
    case "Yfeputs":
      return yfeputs;
    case "Sleep":
      return sleep;
    case "Magic Attenuation":
      return magicAttenuation;
    case "Beer Mug":
      return beerMug;
    case "Leftover Octopus":
      return leftOverOctopus;
    case "Mana Potion":
      return manaPotion;
    case "Panacea":
      return panacea;
    case "Channeling Mana":
      return channelingMana;
    case "Heal":
      return heal;
    case "Party Heal":
      return partyHeal;
    case "Resistance":
      return resistance;
    case "Shield":
      return shield;
    case "Dispel":
      return dispel;
    case "Magic Amplification":
      return magicAmplication;
    case "Magic Armor":
      return magicArmor;
    default:
      return flipped;
  }
}
