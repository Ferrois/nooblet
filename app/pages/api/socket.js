import { Server } from "Socket.IO";
import defaultBoard from "../../boards.json";
import Game from "./../../logic/Game.js";
import onConnectionInitiated from "./../../server/onConnectionInitiated.js";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const gamesState = [];
    const gameCodeGenerator = () => {
      const gameCode = Math.floor(Math.random() * 1000).toString();
      if (gamesState.find((game) => game.gameCode === gameCode || gameCode.length !== 3)) {
        return gameCodeGenerator();
      }
      return gameCode;
    };

    io.on("connection", (socket) => {
      onConnectionInitiated(socket, io, gamesState);
      socket.on("create-game", (user) => {
        const gameCode = gameCodeGenerator();

        console.log(defaultBoard);
        let game = new Game(10, 10, gameCode, defaultBoard);
        game.joinPlayer({ playerId: user.id, name: user.name, isHost: true });
        gamesState.push(game);
        const gameId = game.gameId;
        
        socket.join(gameId);
        socket.emit("game-created", gameCode);
      });

      socket.on("join-game", (user) => {
        const gameCode = user.gameCode;
        const game = gamesState.find((game) => game.gameCode === gameCode);

        //Guards
        if (!game) return socket.emit("message-error", "Game not found");
        if (game.players.find((player) => player.id === user.id)) return socket.emit("message-error", "You are already in this game");
        if (game.players.length >= 4) return socket.emit("message-error", "Game is full");
        if (game.isCurrentlyPlaying) return socket.emit("message-error", "Game has already started");

        game.joinPlayer({ playerId: user.id, name: user.name, isHost: false });

        const gameId = game.gameId;
        console.log(gamesState);
        socket.join(gameId);

        socket.emit("game-joined", gameCode);
      });
    });
  }
  res.end();
};

export default SocketHandler;
