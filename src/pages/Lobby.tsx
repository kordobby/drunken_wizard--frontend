import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rooms from "../Components/LobbyComponents/Rooms";
const Lobby = () => {
  const [createRoomModal, setCreateRooMoadl] = useState(false);

  return (
    <div>
      <button style={{ float: "right" }}>방만들기</button>
      <Link to="/signup">
        <button>회원가입하기</button>
      </Link>
      <Link to="/login">
        <button>로그인하기</button>
      </Link>
      <Rooms />
    </div>
  );
};

export default Lobby;
