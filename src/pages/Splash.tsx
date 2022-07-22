import {
  LogLogo,
  BackWrap,
  LeftBeerImg,
  RightBeerImg,
  BeerBgImg,
  Shadow,
} from "../Components/UserComponents/UserStyled";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/login");
  }, 5000);

  return (
    <BackWrap>
      <LogLogo top={5.729} bottom={4.6875}></LogLogo>
      <BeerBgImg></BeerBgImg>
      <RightBeerImg></RightBeerImg>
      <LeftBeerImg></LeftBeerImg>
      <Shadow></Shadow>
    </BackWrap>
  );
};

export default Splash;
