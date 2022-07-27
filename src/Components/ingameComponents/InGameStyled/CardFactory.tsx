import curse from "../../../images/cardsBack/curseBack.png";
import attack from "../../../images/cardsBack/attackBack.png";
import item from "../../../images/cardsBack/itemBack.png";
import enchant from "../../../images/cardsBack/enchantBack.png";
import flipped from "../../../images/cardsBack/commonBack.png";

import boulderStrike from "../../../images/cards/attack/boulderStrike.png";
import deathRay from "../../../images/cards/attack/deathRay.png";
import beerMug from "../../../images/cards/item/beerMug.png";
import fireBall from "../../../images/cards/attack/fireBall.png";
import leftOverOctopus from "../../../images/cards/item/leftOverOctopus.png";
import magicMissile from "../../../images/cards/attack/magicMissile.png";
import manaPotion from "../../../images/cards/item/manaPotion.png";
import manaSiphon from "../../../images/cards/attack/manaSiphon.png";
import panacea from "../../../images/cards/item/panacea.png";
import poisonArrow from "../../../images/cards/attack/poisonArrow.png";
import magicAttenuation from "../../../images/cards/curse/magicAttenuation.png";
import mute from "../../../images/cards/curse/mute.png";
import petrification from "../../../images/cards/curse/petrification.png";
import sleep from "../../../images/cards/curse/sleep.png";
import venom from "../../../images/cards/curse/venom.png";
import weaknessExposure from "../../../images/cards/curse/weaknessExposure.png";
import yfeputs from "../../../images/cards/curse/yfeputs.png";
import channelingMana from "../../../images/cards/enchant/channelingMana.png";
import dispel from "../../../images/cards/enchant/dispel.png";
import heal from "../../../images/cards/enchant/heal.png";
import magicAmplication from "../../../images/cards/enchant/magicAmplication.png";
import magicArmor from "../../../images/cards/enchant/magicArmor.png";
import partyHeal from "../../../images/cards/enchant/partyHeal.png";
import resistance from "../../../images/cards/enchant/resistance.png";
import shield from "../../../images/cards/enchant/shield.png";

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
    case "WeaknessExposure":
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
