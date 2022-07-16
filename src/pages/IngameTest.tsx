import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import flex from "../Components/GlobalStyled/flex";
import {
  Card,
  TargetBtnProps,
  UseCardProps,
  playersSetting,
} from "../typings/typedb";
import {
  setDrawCardSelectTK,
  cancelSelectDrawCardsTK,
  setSelectUseCardIdTK,
  setTargetTK,
} from "../redux/modules/ingameSlice";
import { useAppSelector, useAppDispatch } from "../hooks/tsHooks";

// import SelectCards from "../Components/IngameComponents/Modals/SelectCards";
const IngameTest = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(false);
  const nowPlayer = useAppSelector((state) => state.game.game.nowPlayerId);
  const [target, setTarget] = useState(0); // 마우스오버 된 대상
  const [mouseIn, setMouseIn] = useState(false); // 모든 컴포넌트에서 마우스 오버 여부 확인
  const selectedUseCard = useAppSelector(
    (state) => state.game.game.selectForUseCardId
  );
  const selectedTarget = useAppSelector(
    (state) => state.game.game.targetPlayer
  );
  const playersData = useAppSelector((state) => state.game.players);
  const playersList = Object.values(playersData);
  console.log(selectedUseCard, selectedTarget);

  const thisPlayer = useAppSelector((state) => state.game.players.thisPlayer);
  const onMouseOverEvent = (
    event: React.MouseEvent<HTMLDivElement>,
    value: number
  ) => {
    setTarget(value); // 마우스를 오버했을 때 해당 item의 값으로 target 변경
    setMouseIn(Boolean(event)); // 마우스 오버 확인
    dispatch(setSelectUseCardIdTK(value));
    //console.log(Boolean(event))
  };

  const onMouseLeaverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setTarget(0); // 마우스가 나왔을 떄 타켓 제거
    setMouseIn(!event);
    console.log(!event); // 마우스 나왔을 때 확인
    dispatch(setSelectUseCardIdTK(0));
  };

  const onMouseTargetingEvent = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: playersSetting
  ) => {
    dispatch(setTargetTK(value.playerId));
    //console.log(Boolean(event))
  };
  const onMouseLeaverTargetHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(setTargetTK(0));
  };
  // 상태값을 바탕으로 클래스를 생성합니다.
  const generateClassName = (
    target: number,
    itemValue: number,
    isMouseIn: boolean
  ) => {
    if (itemValue === target && isMouseIn) {
      return "active";
    }

    if (itemValue === target || mouseIn) {
      return "normal";
    }

    return "default";
  };
  const cardSet = [
    {
      cardId: 1124,
      cardName: "11",
      description: "111",
      manaCost: 1,
      target: "SELECT",
    },
    {
      cardId: 123,
      cardName: "12",
      description: "1221",
      manaCost: 3,
      target: "ENEMY",
    },
    {
      cardId: 123341,
      cardName: "31",
      description: "133",
      manaCost: 2,
      target: "ME",
    },
  ];

  const selectedCard = useAppSelector(
    (state) => state.game.game.selectedDrawCard
  );

  const removeDup = selectedCard.filter(
    (value, index) => selectedCard.indexOf(value) === index
  );

  const sendHealMsgHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    value: Card
  ) => {
    const cardMaker = {
      cardId: value.cardId,
    };
    if (selected === false) {
      dispatch(setDrawCardSelectTK(cardMaker));
      setSelected(true);
    } else {
      dispatch(cancelSelectDrawCardsTK(cardMaker));
      setSelected(false);
    }
  };

  const useCardController = () => {
    console.log(selectedUseCard, selectedTarget);
    const data = { cardId: selectedUseCard, selectedTarget };
    console.log(data);
  };

  const TargetBtns = playersList.map((value) => (
    <TargetBtn
      key={value.playerId}
      onClick={useCardController}
      onMouseOver={(event: any) => onMouseTargetingEvent(event, value)}
      onMouseLeave={onMouseLeaverTargetHandler}
    >
      {value.username}
    </TargetBtn>
  ));
  return (
    <>
      <IngameHeader>
        <span>"ㅇㅇㅇ님이 게임을 하고 있습니다."</span>
      </IngameHeader>
      <IngameMain>
        <span>dd</span>
      </IngameMain>
      <IngameFooter>
        <ThisPlayer>
          <PlayerImg />
          <PlayerName>
            <span>DrunkenWizrd</span>
          </PlayerName>
        </ThisPlayer>
        <CardField>
          {cardSet.map((value: Card, index: number) => {
            return (
              <CardSample
                key={value.cardId}
                className={generateClassName(target, index + 1, mouseIn)}
                onMouseOver={(event: any) => onMouseOverEvent(event, index + 1)}
                onMouseLeave={onMouseLeaverHandler}
                value={value}
              >
                {nowPlayer === thisPlayer.playerId &&
                  value.target === "SELECT" &&
                  mouseIn &&
                  target === value.cardId && (
                    <>
                      {TargetBtns}
                      <button>버리기</button>
                    </>
                  )}
              </CardSample>
            );
          })}
        </CardField>
        <PlayerController>컨트롤러</PlayerController>
      </IngameFooter>
    </>
  );
};

const IngameHeader = styled.div`
  height: calc(100vh - 90vh);
  background-color: purple;
  ${flex({ justify: "center", align: "center" })};
`;

const IngameMain = styled.div`
  width: 100vw;
  height: calc(100vh - 40vh);
  background-color: green;
`;

const IngameFooter = styled.div`
  height: calc(100vh - 70vh);
  ${flex({ justify: "space-between", align: "center" })};
  background-color: yellow;
`;

const ThisPlayer = styled.div`
  height: 100%;
  width: 250px;
  background-color: antiquewhite;
  ${flex({ direction: "column", justify: "center", align: "center" })};
`;

const PlayerImg = styled.div`
  height: 160px;
  width: 160px;
  border-radius: 80px;
  background-color: tomato;
`;

const PlayerName = styled.div`
  height: 40px;
  width: 160px;
  background-color: #ffaa9b;
  ${flex({ justify: "center", align: "center" })};
`;

const CardField = styled.div`
  height: 100%;
  width: calc(100vw - 550px);
  background-color: beige;
  ${flex({ justify: "space-around", align: "center" })};
  .active {
    background-color: blue;
  }

  .normal {
    background: red;
    transform: scale(0.8);
  }
  .default {
    background: yellow;
  }
`;

const PlayerController = styled.div`
  height: 100%;
  width: 300px;
  background-color: blue;
`;
export default IngameTest;

const TargetBtn = styled.button<TargetBtnProps>`
  width: 50px;
  height: 50px;
`;

const CardSample = styled.div<UseCardProps>`
  height: 160px;
  width: 120px;
  /* .active {
    background-color: blue;
  }

  .normal {
    background: red;
    transform: scale(0.8);
  }
  .default {
    background: yellow;
  }
  transition: all 100ms ease-in-out; */
`;
