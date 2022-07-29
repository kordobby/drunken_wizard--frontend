import profile0 from "../../images/lobby/profile0.webp";
import profile1 from "../../images/lobby/profile1.webp";
import profile2 from "../../images/lobby/profile2.webp";
import profile3 from "../../images/lobby/profile3.webp";
import profile4 from "../../images/lobby/profile4.webp";
import profile5 from "../../images/lobby/profile5.webp";

export default function matchProfileImg(data: number) {
  switch (data) {
    case 0:
      return profile0;
    case 1:
      return profile1;
    case 2:
      return profile2;
    case 3:
      return profile3;
    case 4:
      return profile4;
    case 5:
      return profile5;
    default:
      return;
  }
}
