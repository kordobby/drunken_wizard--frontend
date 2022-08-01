import styled from "styled-components";
import { keyframes } from "styled-components";
import feedback from "../../images/icons/feedback.png";
const PlayBtn = () => {
  return (
    <>
      <AudioButton
        onClick={() =>
          window.open("https://forms.gle/WfvxAfs2QvordrBcA", "_blank")
        }
      >
        <PlayBtnIcon />
      </AudioButton>
    </>
  );
};

const nowPlaying = keyframes`
  0% {
    transform: translateY(0) ;
  } 
  50% {
    transform: translateY(-0.625vw) ;
  } 100% {
    transform: translateY(0) ;
  }
`;

const AudioButton = styled.button`
  animation: ${nowPlaying} 1s ease infinite;
  background: none;
  border: none;
  position: fixed;
  bottom: 2.885vw;
  right: 22vw;
`;

export const PlayBtnIcon = styled.img.attrs({
  src: `${feedback}`,
})`
  width: 8.8vw;
  z-index: 3;
  &:hover {
    filter: brightness(110%);
  }
`;

export default PlayBtn;
