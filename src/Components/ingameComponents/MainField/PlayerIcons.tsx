/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Modules */

/* CSS & SC */
import styled from "styled-components";
import matchCardImg from "../InGameStyled/CardFactory";
import {
  TableImg,
  PlayerIcon,
  PlayerIconsFields,
  NameTag,
  TeamPosition,
  PlayingFlag,
} from "../InGameStyled/InGameStyled";

/* types */
import { CraveCardsProps, HeaderProps } from "../../../typings/typedb";

const PlayerIcons = ({ status }: HeaderProps) => {
  const selectedCard = useAppSelector(
    (state) => state.game.game.selectForUseCard
  );
  const nowPlayerId = useAppSelector((state) => state.game.game.nowPlayerId);
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const teamPlayer = useAppSelector((state) => state.game.players.PlayerA);
  const enemyA = useAppSelector((state) => state.game.players.PlayerB);
  const enemyB = useAppSelector((state) => state.game.players.PlayerC);

  return (
    <>
      <PlayerIconsFields>
        {/* <AudioBtn></AudioBtn> */}
        {selectedCard.cardName !== "" && (
          <CardBig value={selectedCard}></CardBig>
        )}
        {/* ME */}
        <TeamPosition layer={5} top={0.5208} left={2.604}>
          <PlayerIcon
            size={18.75}
            job={teamPlayer.charactorClass}
            dead={teamPlayer.dead}
            reverse={true}
          >
            <div className="wizard__img"></div>
            {nowPlayerId === teamPlayer.playerId && (
              <PlayingFlag
                status={status}
                top={-3.125}
                left={9.2916}
              ></PlayingFlag>
            )}
            <NameTag
              dead={teamPlayer.dead}
              team={teamPlayer.team}
              top={0.5208}
              left={5.625}
            >
              {teamPlayer.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        {/* This Player */}
        <TeamPosition layer={5} top={0.5208} left={33.33}>
          <PlayerIcon
            size={18.75}
            job={thisPlayer.charactorClass}
            dead={thisPlayer.dead}
            reverse={false}
          >
            <div className="wizard__img"></div>
            {nowPlayerId === thisPlayer.playerId && (
              <PlayingFlag
                status={status}
                top={-3.125}
                left={12.2916}
              ></PlayingFlag>
            )}
            <NameTag
              dead={thisPlayer.dead}
              team={thisPlayer.team}
              top={0.5208}
              left={4.427}
            >
              {thisPlayer.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TableImg alt="tableImg" />
        <TeamPosition layer={1} top={13.541} left={28.645}>
          <PlayerIcon
            size={15.104}
            job={enemyB.charactorClass}
            dead={enemyB.dead}
            reverse={false}
          >
            <div className="wizard__img"></div>
            {nowPlayerId === enemyB.playerId && (
              <PlayingFlag
                status={status}
                top={-3.125}
                left={4.166}
              ></PlayingFlag>
            )}
            <NameTag dead={enemyB.dead} team={enemyB.team} top={2.083} left={0}>
              {enemyB.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TeamPosition layer={1} top={13.541} left={13.02}>
          <PlayerIcon
            size={15.104}
            job={enemyA.charactorClass}
            dead={enemyA.dead}
            reverse={true}
          >
            <div className="wizard__img"></div>
            {nowPlayerId === enemyA.playerId && (
              <PlayingFlag
                status={status}
                top={-3.125}
                left={7.2916}
              ></PlayingFlag>
            )}
            <NameTag
              dead={enemyA.dead}
              team={enemyA.team}
              top={2.083}
              left={6.25}
            >
              {enemyA.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
      </PlayerIconsFields>
    </>
  );
};

const CardBig = styled.div<CraveCardsProps>`
  height: 29.666vw;
  width: 16.6716vw;
  background-image: url(${(props) => matchCardImg(props.value.cardName)});
  background-size: cover;
  position: absolute;
  bottom: 5%;
  right: 32%;
  z-index: 1000;
`;

export default PlayerIcons;
