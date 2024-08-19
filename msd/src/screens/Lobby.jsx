import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSocket } from "../context/SocketProvider";
import axios from "axios";
const LobbyScreen = () => {
      const [cookies, removeCookie] = useCookies([]);
  const [temp, setTemp] = useState("");
const room=1;
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", {temp, room });
    },
    [temp, room, socket]
  );

  const handleJoinRoom = useCallback(
    () => {
      navigate(`/room`);


    },
    [navigate]
  );

  useEffect(() => {

    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "https://medicine-service-development-2.onrender.com",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else{
          setTemp(data.user);
        }
         
      }
    };
    verifyUser();


    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom,cookies, navigate, removeCookie]);

  return (
    <div>
      <h1 style={{color:'green',textAlign:'center'}}>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <button style={{marginLeft:'auto',marginRight:'auto',display:'block',width:'10%',height:'30px',borderRadius:'9px',backgroundColor:'#279EFF'}}>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
