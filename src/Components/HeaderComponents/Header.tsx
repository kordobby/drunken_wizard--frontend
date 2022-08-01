import styled from "styled-components";
import flex from "../GlobalStyled/flex";
import header from "../../images/imgs/header.webp";

const Header = () => {
  return <Headers></Headers>;
};

export default Header;

const Headers = styled.header`
  width: 100vw;
  min-width: 70vw;
  height: 150px;
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${header});
  ${flex({ align: "center", justify: "space-between" })}
`;
