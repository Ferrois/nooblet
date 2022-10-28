import { useRouter } from "next/router.js";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext.js";
import Game from "../logic/Game.js";
import Layout from "../templates/Layout.js";
import { toastError, toastSuccess } from "../utilities/toastResponses.js";
import defaultBoard from "../boards.json";
// let socket

const Homepage = () => {
  const {socket,socketInitializer, userData, setUserData} = useContext(PlayerContext);
  // const [username, setUsername] = useState(userData.name);
  const [gameCode, setGameCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(()=>{
    if (!socket) return;
    socketListeners();
    checkId();
    return () => {
      socket.off("connect")
      socket.off("game-created");
      socket.off("game-joined");
      socket.off("message-error");
    }
  },[socket])

  const socketListeners = async () => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("game-joined", (gameCode) => {
      toastSuccess("Game Joined: " + gameCode);
      router.push(`/${gameCode}`);
    });

    socket.on("game-created", (gameCode) => {
      toastSuccess("Game created: " + gameCode);
      router.push(`/${gameCode}`);
    });

    socket.on("init:return-user", ({playerId, gameCode})=>{
      if (gameCode === null) return
    })

    socket.on("message-error", (msg) => {
      console.log(msg);
      toastError(msg);
    });
  };

  const checkId = () => {
    socket.emit("init:user",userData);
  }

  const handleCreate = () => {
    if (userData.name.length < 3) return toastError("Username must be at least 3 characters");
    socket.emit("create-game", { id: "test", name: userData.name });
  };

  const handleJoin = () => {
    if (gameCode.length !== 3) return toastError("Game code must be 3 characters");
    if (userData.name.length < 3) return toastError("Username must be at least 3 characters");
    socket.emit("join-game", { id: "test", name: userData.name, gameCode });
  };

  return (
    <Layout>
      <div className="h-screen w-screen flex justify-center items-center bg-gray-500">
        <div className="flex flex-col">
          <input placeholder="Username" value={userData.name} onChange={(e) => setUserData({...userData,name:e.target.value})} />
          <input placeholder="Game Code" value={gameCode} onChange={(e) => setGameCode(e.target.value)} />
          <button onClick={() => handleJoin()}>Join</button>
          <button onClick={() => handleCreate()}>Create</button>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
