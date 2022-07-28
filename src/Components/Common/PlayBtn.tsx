import styled from "styled-components";
import playBtn from "../../images/icons/playBtn.png";
// import musics from "../../sounds/gameBgm.wav";
import { useEffect, useState } from "react";
import useSound from "use-sound";
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
      <AudioButton onClick={play}>
        <PlayBtnIcon />
      </AudioButton>
    </>
  );
};

const AudioButton = styled.button`
  background: none;
  border: none;
  position: fixed;
  top: 10px;
  left: 10px;
`;

export const PlayBtnIcon = styled.img.attrs({
  src: `${playBtn}`,
})`
  width: 2.8vw;
  height: 2.8vw;
  z-index: 3;
`;

export default PlayBtn;
