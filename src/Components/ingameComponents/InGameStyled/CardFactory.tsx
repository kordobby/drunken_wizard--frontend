import curse from "../../../images/cardsBack/curseBack.png";
import attack from "../../../images/cardsBack/attackBack.png";
import item from "../../../images/cardsBack/itemBack.png";
import enchant from "../../../images/cardsBack/enchantBack.png";
export default function matchCardImg(data: string) {
  switch (data) {
    case "boulderStrike":
      return attack;
    case "deathRay":
      return attack;
    case "fireBall":
      return attack;
    case "magicMissile":
      return attack;
    case "manaSiphon":
      return attack;
    case "poisonArrow":
      return attack;
    case "mute":
      return curse;
    case "petrification":
      return curse;
    case "weaknessExposure":
      return curse;
    case "venom":
      return curse;
    case "yfeputs":
      return curse;
    case "sleep":
      return curse;
    case "magicAttenuation":
      return curse;
    case "beerMug":
      return item;
    case "leftOverOctopus":
      return item;
    case "manaPotion":
      return item;
    case "panacea":
      return item;
    case "channelingMana":
      return enchant;
    case "heal":
      return enchant;
    case "partyHeal":
      return enchant;
    case "resistance":
      return enchant;
    case "shield":
      return enchant;
    case "dispel":
      return enchant;
    case "magicAmplification":
      return enchant;
    case "magicArmor":
      return enchant;
    default:
      return enchant;
  }
}
