class TurnCycle {
    constructor ({players, onNewEvent}){
        this.players = players;
        this.onNewEvent = onNewEvent;
        this.currentPlayer = 0;
        this.turns = 0;
        this.turnsSinceLastEvent = 0;
        this.events = [];
        this.event = null;
    }

    async turn(){
        const player = this.players[this.currentPlayer];
        const event = await this.getEvent();
        if (event) {
            this.onNewEvent(event);
            this.turnsSinceLastEvent = 0;
        }
        this.turnsSinceLastEvent++;
        this.turns++;
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        return {player, event};
    }
}