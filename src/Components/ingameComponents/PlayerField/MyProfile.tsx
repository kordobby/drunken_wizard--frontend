import matchClassImg from "../InGameStyled";
import styled from "styled-components";
import flex from "../../GlobalStyled/flex";
import { IconsImgProps } from "../../../typings/typedb";
import { ProfileProps } from "../../../typings/typedb";

const MyProfile = ({ myState }: ProfileProps) => {
  return (
    <ProfileSizing>
      <ProfileIcon job={myState.charactorClass}></ProfileIcon>
      <div>
        <span>HP : {myState.health}</span>
        <span>MP : {myState.mana}</span>
      </div>
      <div>
        <span>status : ######</span>
      </div>
    </ProfileSizing>
  );
};

const ProfileSizing = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
`;

const ProfileIcon = styled.div<IconsImgProps>`
  width: 150px;
  height: 150px;
  background-image: url(${(props) => matchClassImg(props.job)});
  background-size: cover;
  border-radius: 30px;
`;
export default MyProfile;
