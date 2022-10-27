import { v4 } from "uuid";
import { findNextMove } from "./findnextmove.js";
import numberOfDice from "./numberDice.js";

class Game {
  constructor(x_width, y_width,gameCode, boardData) {
    this.x_width = x_width;
    this.y_width = y_width;
    this.boardData = boardData;
    this.players = [];
    this.currentPlayer = 0;
    this.totalPlayers = 0;
    this.maxPlayers = 4;
    this.isCurrentlyPlaying = false;
    this.gameCode = gameCode;
    this.gameId = v4();
  }

  move(playerId) {
    //Direction is [1,0] right, [0,1] up, [-1,0] left, [0,-1] down
    const selectedPlayer = this.players.find((player) => player.id === playerId);
    const tiles = this.boardData.tiles;
    const { newPosition, newDirection } = findNextMove(tiles, selectedPlayer);
    selectedPlayer.position = newPosition;
    selectedPlayer.direction = newDirection;
  }

  joinPlayer({ playerId, name, isHost }) {
    if (this.isCurrentlyPlaying) { return "The game is currently running."; }
    const tiles = this.boardData.tiles;
    const spawnTile = tiles.filter((tile) => tile.type === "start")[0];
    const spawnPosition = spawnTile.position;
    const spawnDirection = spawnTile.spawnDirection;
    const newPlayer = {
      id: playerId,
      idx: this.totalPlayers,
      name,
      position: spawnPosition,
      direction: spawnDirection,
      money: 69,
      bank: 0,
      items: [],
      stocks: [],
      properties: [],
      jailed: false,
      jailTurns: 0,
      bankrupt: false,
      alive: true,
      hospitalTurns: 0,
      movement: "walk",
      AFKturns: 0,
      isHost,
    };
    this.totalPlayers++;
    this.players.push(newPlayer);
  }

  rollDice({ playerId }) {
    const selectedPlayer = this.players.find((player) => player.id === playerId);
    const numDice = numberOfDice(selectedPlayer.movement);
    const dices = [];
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * 6) + 1;
      dices.push(roll);
    }
    const total = dices.reduce((a, b) => a + b, 0);
    this.nextPlayer();
    for (let i = 0; i < total; i++) {
      console.log("Position: " + i, selectedPlayer.position);
      this.move(playerId);
    }
    // return { dices, value: total };
  }

  async promptPlayer(playerId, message) {
    const selectedPlayer = this.players.find((player) => player.id === playerId);
    selectedPlayer.prompt = message;
    
  }

  nextPlayer() {
    this.currentPlayer = (this.currentPlayer + 1) % this.totalPlayers;
  }

  initiateGame(){
    this.isCurrentlyPlaying = true;
  }

  render() {
    const data = {
      players: this.players,
      board: this.boardData,
    };
    return data
  }

  onReady(callback) {
    this.board.on("ready", callback);
  }
}

export default Game;
