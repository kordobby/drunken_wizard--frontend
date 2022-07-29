import styled, { keyframes } from "styled-components";
import playBtn from "../../images/icons/playBtn.webp";
import bgm from "../../sounds/bgm.mp3";

const AudioBtn = () => {
  return (
    <Audio controls loop>
      <source src={bgm} type="audio/mp3"></source>
    </Audio>
  );
};

const Audio = styled.audio`
  z-index: 1000;
  color: white;
  position: absolute;
  top: 1vw;
  left: -4.5vw;
  opacity: 0.7;
  padding: 0;
  position: absolute;
  &::-webkit-media-controls-volume-slider-container,
  &::-webkit-media-controls-volume-slider,
  &::-webkit-media-controls-panel,
  &::-webkit-media-controls-mute-button,
  &::-webkit-media-controls-play-button {
    color: white;
  }
  &::-webkit-media-controls-enclosure {
    /* display: none; */
    /* border: none; */
    width: 8.8vw;
    display: flex;
    justify-content: flex-start;
    padding: 0 0.5vw;
    box-sizing: border-box;
    background-color: var(--brown-3);
  }

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
