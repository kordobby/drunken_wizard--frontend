import profile0 from "../../images/lobby/profile0.png";
import profile1 from "../../images/lobby/profile1.png";
import profile2 from "../../images/lobby/profile2.png";
import profile3 from "../../images/lobby/profile3.png";
import profile4 from "../../images/lobby/profile4.png";
import profile5 from "../../images/lobby/profile5.png";

export default function matchProfileImg(data: string) {
  switch (data) {
    case "0":
      return profile0;
    case "1":
      return profile1;
    case "2":
      return profile2;
    case "3":
      return profile3;
    case "4":
      return profile4;
    case "5":
      return profile5;
    default:
      return;
  }
}
