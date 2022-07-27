/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Modules */

/* CSS & SC */
import {
  TableImg,
  PlayerIcon,
  PlayerIconsFields,
  NameTag,
  TeamPosition,
  PlayingFlag,
} from "../InGameStyled/InGameStyled";

import { HeaderProps } from "../../../typings/typedb";

const PlayerIcons = ({ status }: HeaderProps) => {
  const nowPlayerId = useAppSelector((state) => state.game.game.nowPlayerId);
  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const teamPlayer = useAppSelector((state) => state.game.players.PlayerA);
  const enemyA = useAppSelector((state) => state.game.players.PlayerB);
  const enemyB = useAppSelector((state) => state.game.players.PlayerC);

  console.log(status);
  return (
    <>
      <PlayerIconsFields>
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
              <PlayingFlag status={status} top={-80} left={140}></PlayingFlag>
            )}
            <NameTag
              dead={teamPlayer.dead}
              team={thisPlayer.team === teamPlayer.team}
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
              <PlayingFlag status={status} top={-80} left={170}></PlayingFlag>
            )}
            <NameTag
              dead={thisPlayer.dead}
              team={true}
              top={0.5208}
              left={4.427}
            >
              {thisPlayer.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TableImg />
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
            <NameTag
              dead={enemyB.dead}
              team={thisPlayer.team === enemyB.team}
              top={2.083}
              left={0}
            >
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
              team={thisPlayer.team === enemyA.team}
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

export default PlayerIcons;
