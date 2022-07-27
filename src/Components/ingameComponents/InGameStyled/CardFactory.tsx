import curse from "../../../images/cardsBack/curseBack.png";
import attack from "../../../images/cardsBack/attackBack.png";
import item from "../../../images/cardsBack/itemBack.png";
import enchant from "../../../images/cardsBack/enchantBack.png";
import flipped from "../../../images/cardsBack/commonBack.png";

import boulderStrike from "../../../images/cards/boulderStrike.png";
import deathRay from "../../../images/cards/deathRay.png";
import beerMug from "../../../images/cards/beerMug.png";
import fireBall from "../../../images/cards/fireBall.png";
import leftOverOctopus from "../../../images/cards/leftOverOctopus.png";
import magicMissile from "../../../images/cards/magicMissile.png";
import manaPotion from "../../../images/cards/manaPotion.png";
import manaSiphon from "../../../images/cards/manaSiphon.png";
import panacea from "../../../images/cards/panacea.png";
import poisonArrow from "../../../images/cards/poisonArrow.png";

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
      return curse;
    case "Petrification":
      return curse;
    case "WeaknessExposure":
      return curse;
    case "Venom":
      return curse;
    case "Yfeputs":
      return curse;
    case "Sleep":
      return curse;
    case "Magic Attenuation":
      return curse;
    case "Beer Mug":
      return beerMug;
    case "Leftover Octopus":
      return leftOverOctopus;
    case "Mana Potion":
      return manaPotion;
    case "Panacea":
      return panacea;
    case "Channeling Mana":
      return enchant;
    case "Heal":
      return enchant;
    case "Party Heal":
      return enchant;
    case "Resistance":
      return enchant;
    case "Shield":
      return enchant;
    case "Dispel":
      return enchant;
    case "Magic Amplification":
      return enchant;
    case "Magic Armor":
      return enchant;
    default:
      return flipped;
  }
}
