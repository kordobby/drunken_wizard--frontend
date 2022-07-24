/* Hooks */
import { useAppSelector } from "../../../hooks/tsHooks";

/* Modules */
import { NameTagProps } from "../../../typings/typedb";

/* CSS & SC */
import { TableImg, PlayerIcon } from "../InGameStyled";
import {
  PlayerIconsFields,
  NameTag,
  TeamPosition,
  PlayingFlag,
} from "../InGameStyled";

const PlayerIcons = () => {
  const playersData = useAppSelector((state) => state.game.players);

  return (
    <>
      <PlayerIconsFields>
        <TeamPosition layer={5} top={10} left={50}>
          <PlayerIcon
            size={360}
            job={playersData.PlayerA.charactorClass}
            dead={playersData.PlayerA.dead}
            reverse={true}
          >
            <div className="wizard__img"></div>
            <PlayingFlag
              dead={playersData.PlayerA.dead}
              top={-80}
              left={140}
            ></PlayingFlag>
            <NameTag dead={playersData.PlayerA.dead} top={10} left={108}>
              {playersData.PlayerA.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TeamPosition layer={5} top={10} left={640}>
          <PlayerIcon
            size={360}
            job={playersData.PlayerA.charactorClass}
            dead={playersData.PlayerA.dead}
            reverse={false}
          >
            <div className="wizard__img"></div>
            <PlayingFlag
              dead={playersData.PlayerA.dead}
              top={-80}
              left={170}
            ></PlayingFlag>
            <NameTag dead={playersData.PlayerA.dead} top={10} left={85}>
              {playersData.PlayerA.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TableImg />
        <TeamPosition layer={1} top={260} left={550}>
          <PlayerIcon
            size={290}
            job={playersData.PlayerA.charactorClass}
            dead={playersData.PlayerA.dead}
            reverse={false}
          >
            <div className="wizard__img"></div>
            <PlayingFlag
              dead={playersData.PlayerA.dead}
              top={-60}
              left={80}
            ></PlayingFlag>
            <NameTag dead={playersData.PlayerA.dead} top={40} left={0}>
              {playersData.PlayerA.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
        <TeamPosition layer={1} top={260} left={250}>
          <PlayerIcon
            size={290}
            job={playersData.PlayerA.charactorClass}
            dead={playersData.PlayerA.dead}
            reverse={true}
          >
            <div className="wizard__img"></div>
            <PlayingFlag
              dead={playersData.PlayerA.dead}
              top={-60}
              left={140}
            ></PlayingFlag>
            <NameTag dead={playersData.PlayerA.dead} top={40} left={120}>
              {playersData.PlayerA.username}
            </NameTag>
          </PlayerIcon>
        </TeamPosition>
      </PlayerIconsFields>
    </>
  );
};

export default PlayerIcons;
