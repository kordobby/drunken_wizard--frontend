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
        <TeamPosition layer={5} top={10} left={50}>
          <PlayerIcon
            size={360}
            job={thisPlayer.charactorClass}
            dead={thisPlayer.dead}
            reverse={true}
          >
            <div className="wizard__img"></div>
            {nowPlayerId === thisPlayer.playerId && (
              <PlayingFlag status={status} top={-80} left={140}></PlayingFlag>
            )}
            <NameTag dead={true} top={10} left={108}>
              {thisPlayer.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TeamPosition layer={5} top={10} left={640}>
          <PlayerIcon
            size={360}
            job={teamPlayer.charactorClass}
            dead={teamPlayer.dead}
            reverse={false}
          >
            <div className="wizard__img"></div>
            {nowPlayerId === teamPlayer.playerId && (
              <PlayingFlag status={status} top={-80} left={170}></PlayingFlag>
            )}
            <NameTag dead={true} top={10} left={85}>
              {teamPlayer.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TableImg />
        <TeamPosition layer={1} top={260} left={550}>
          <PlayerIcon
            size={290}
            job={enemyB.charactorClass}
            dead={enemyB.dead}
            reverse={false}
          >
            <div className="wizard__img"></div>
            {nowPlayerId === enemyB.playerId && (
              <PlayingFlag status={status} top={-60} left={80}></PlayingFlag>
            )}
            <NameTag dead={enemyB.dead} top={40} left={0}>
              {enemyB.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TeamPosition layer={1} top={260} left={250}>
          <PlayerIcon
            size={290}
            job={enemyA.charactorClass}
            dead={enemyA.dead}
            reverse={true}
          >
            <div className="wizard__img"></div>
            {nowPlayerId === enemyA.playerId && (
              <PlayingFlag status={status} top={-60} left={140}></PlayingFlag>
            )}
            <NameTag dead={enemyB.dead} top={40} left={120}>
              {enemyA.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
      </PlayerIconsFields>
    </>
  );
};

export default PlayerIcons;
