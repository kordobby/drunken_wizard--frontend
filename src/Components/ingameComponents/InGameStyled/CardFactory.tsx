import curse from "../../../images/cardsBack/curseBack.png";
import attack from "../../../images/cardsBack/attackBack.png";
import item from "../../../images/cardsBack/itemBack.png";
import enchant from "../../../images/cardsBack/enchantBack.png";
import flipped from "../../../images/cardsBack/commonBack.png";

export default function matchCardImg(data: string) {
  switch (data) {
    case "Boulder Strike":
      return attack;
    case "Death Ray":
      return attack;
    case "Fire Ball":
      return attack;
    case "Magic Missile":
      return attack;
    case "Mana Siphon":
      return attack;
    case "Poison Arrow":
      return attack;
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
      return item;
    case "Leftover Octopus":
      return item;
    case "Mana Potion":
      return item;
    case "Panacea":
      return item;
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
