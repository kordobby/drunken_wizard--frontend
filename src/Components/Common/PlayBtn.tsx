import styled from "styled-components";
import playBtn from "../../images/icons/playBtn.png";
import bubble from "../../images/imgs/bubble.png";
import { keyframes } from "styled-components";
import { Link } from "react-router-dom";
const PlayBtn = () => {
  // const audio = useState(new Audio(`../../sounds/gameBgm.wav`));
  // const [playing, setPlaying] = useState(false);

  // const toggle = () => setPlaying(!playing);
  // useEffect(() => {
  //   playing ? audio.play() : audio.pause();
  // }, [playing]);
  // const [sound] = useSound(musics);
  const play = () => {
    // sound();
  };
  return (
    <>
      <AudioButton
        onClick={() =>
          window.open("https://forms.gle/WfvxAfs2QvordrBcA", "_blank")
        }
      >
        <PlayBtnIcon />
      </AudioButton>
      <BubbleWrap
        onClick={() =>
          window.open("https://forms.gle/WfvxAfs2QvordrBcA", "_blank")
        }
      >
        설문하러 가기!
      </BubbleWrap>
      <Bubble></Bubble>
    </>
  );
};

const nowPlaying = keyframes`
  0% {
    transform: translateY(0) scaleX(-1);
  } 
  50% {
    transform: translateY(-0.625vw) scaleX(-1);
  } 100% {
    transform: translateY(0) scaleX(-1);
  }
`;

const beer = keyframes`
  0% {
    transform: translateY(0);
  } 
  50% {
    transform: translateY(-0.625vw) ;
  } 100% {
    transform: translateY(0);
  }
`;

const BubbleWrap = styled.span`
  animation: ${beer} 1s ease infinite;
  position: fixed;
  bottom: 5.2vw;
  right: 11.485vw;
  z-index: 10;
`;

const Bubble = styled.img.attrs({
  src: `${bubble}`,
})`
  animation: ${nowPlaying} 1s ease infinite;
  width: 10.8vw;
  position: fixed;
  bottom: 2.885vw;
  right: 8.885vw;
  z-index: 5;
  position: absolute;
  transform: scaleX(-1) rotate(8deg);
  &:hover {
    filter: brightness(120%);
  }
`;

const AudioButton = styled.button`
  animation: ${nowPlaying} 1s ease infinite;
  background: none;
  border: none;
  position: fixed;
  bottom: 2.885vw;
  right: 2.885vw;
`;

export const PlayBtnIcon = styled.img.attrs({
  src: `${playBtn}`,
})`
  width: 6.8vw;
  height: 6.8vw;
  z-index: 3;
  &:hover {
    filter: brightness(120%);
  }
`;

export default PlayBtn;
