import { v4 } from "uuid";

export default function onConnectionInitiated(socket, io, gamesState) {
  socket.on("init:user", (user) => {
    // User has a playerId, currently in a game
    if (user.playerId !== null) {
      const selectedGame = gamesState.find((game) => game.players.find((player) => player.id === user.playerId));
      if (!selectedGame) {
        const response = {roomCode:null, playerId: user.playerId}
        return;
      }
      // const selectedPlayer = selectedGame.players.find((player) => player.id === user.playerId);
      const response = { roomCode: selectedGame.gameCode, playerId: user.playerId };
      socket.emit("init:return-user", response);
    }
    // User does not have a playerId, initiate new playerId
    if (user.playerId === null) {
      const response = {
        roomCode: null,
        playerId: v4(),
      };
      socket.emit("init:return-user", response);
    }
  });
}
