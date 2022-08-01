import bgm from "../../sounds/bgm.mp3";
import ReactAudioPlayer from "react-audio-player";
const AudioBtn = () => {
  return (
    <>
      <ReactAudioPlayer
        src={bgm}
        autoPlay
        controls
        loop
        style={{
          position: "absolute",
          // top: "-6.5vw",
          // right: "11vw",
          marginLeft: "56vw",
          opacity: "0.5",
          width: "12.8vw",
          height: "2.5vh",
          display: "flex",
          zIndex: "100",
          float: "right",
        }}
      ></ReactAudioPlayer>
    </>
  );
};

export default AudioBtn;
