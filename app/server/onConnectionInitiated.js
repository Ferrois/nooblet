export default function onConnectionInitiated(socket, io, gamesState) {
    socket.on("init:user", (user) => {
        // User has a playerId, currently in a game
        if (user.playerId !== null) {
            const selectedGame = gamesState.find((game) => game.players.find((player) => player.id === user.playerId));
            if (!selectedGame) {
                socket.emit("message-error", "Your previous game was not found");
                return;
            }
            // const selectedPlayer = selectedGame.players.find((player) => player.id === user.playerId);
            response = {roomCode: selectedGame.gameCode, playerId: user.playerId};
            socket.emit("game-joined", response);
        }
        // User does not have a playerId, initiate new playerId
        if (user.playerId === null) {
            const response = {
                roomCode: null,
                playerId: v4(),
            };
            socket.emit("user-initialized", response);
        }
        socket.emit("init:user-response", user);
    })
}