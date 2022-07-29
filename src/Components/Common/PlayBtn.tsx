import styled from "styled-components";
import playBtn from "../../images/icons/playBtn.webp";
import bubble from "../../images/imgs/bubble.webp";
import { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import feedback from "../../images/icons/feedback.png";
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
  right: 2.885vw;
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
