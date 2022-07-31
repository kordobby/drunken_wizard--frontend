import { useState } from "react";
import styled, { keyframes } from "styled-components";
import bgm from "../../sounds/bgm.mp3";
import ReactAudioPlayer from "react-audio-player";
const AudioBtn = () => {
  const [isPlaying, setIsPlaying] = useState();

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
      {/* <AudioWrap>
        <div className="audio">
          <AudioBack>
            <Audio controls loop>
              <button>dddddd</button>
              <source src={bgm} type="audio/mp3"></source>
            </Audio>
          </AudioBack>
        </div>
      </AudioWrap> */}
    </>
  );
};

const AudioWrap = styled.div`
  position: absolute;
  top: 0.5vh;
  right: 0.5vw;
`;

const AudioBack = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4.8vw;
  background-color: var(--grey);
  position: relative;
`;

const Audio = styled.audio`
  z-index: 1000;
  color: white;
  position: absolute;
  top: -6px;
  right: -105px;
  opacity: 0.7;
  padding: 0;
  position: absolute;
  &::-webkit-media-controls-panel,
  &::-webkit-media-controls-play-button {
    /* display: none; */
  }
  &::-webkit-media-controls-enclosure {
    width: 50px;
    display: flex;
    justify-content: flex-start;
    padding: 0 0.5vw;
    box-sizing: border-box;
    background: none;
  }
  &::-webkit-media-controls-mute-button,
  &::-webkit-media-controls-volume-slider-container,
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-timeline-container,
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display,
  &::-webkit-media-controls-timeline,
  &::-webkit-media-controls-seek-back-button,
  &::-webkit-media-controls-seek-forward-button,
  &::-webkit-media-controls-fullscreen-button,
  &::-webkit-media-controls-rewind-button,
  &::-webkit-media-controls-return-to-realtime-button,
  &::-webkit-media-controls-toggle-closed-captions-button {
    display: none;
  }
`;

export default AudioBtn;
