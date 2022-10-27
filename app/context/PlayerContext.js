// Context
import React, { createContext, useState } from "react";
import io from "socket.io-client";
import useSessionStorage from "../utilities/useSessionStorage";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [playerId,setPlayerId] = useSessionStorage("id", null);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    const socket = io();
    setSocket(socket);
  };


  return <PlayerContext.Provider value={{ socket , socketInitializer }}>{children}</PlayerContext.Provider>;
};
