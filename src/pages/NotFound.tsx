/* Package */
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

/* Components */
import { DefaultBtnL } from "../Components/Common/CommonStyle";
import PlayBtn from "../Components/Common/PlayBtn";

/* CSS & SC */
import {
  LogLogo,
  BackWrap,
  NotFoundTitle,
} from "../Components/UserComponents/UserStyled";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Please go back! Drunken Wizard</title>
        </Helmet>
      </HelmetProvider>
      <BackWrap>
        <PlayBtn></PlayBtn>
        <LogLogo top={5.729} bottom={4.6875}></LogLogo>
        <NotFoundTitle>잘못된 접근입니다!</NotFoundTitle>
        <NotFoundTitle>돌아가기 버튼을 눌러주세요 :)</NotFoundTitle>
        <DefaultBtnL
          style={{ marginTop: "5vh" }}
          disabled={true}
          onClick={() => {
            navigate("/login");
          }}
        >
          돌아가기
        </DefaultBtnL>
      </BackWrap>
    </>
  );
};

export default NotFound;
