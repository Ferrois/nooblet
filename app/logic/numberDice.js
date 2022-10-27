import boardData from "../boards.json";

function numberOfDice(movement){
    const vehicleType = boardData.movements.find((data) => data.vehicle === movement);
    return vehicleType.dice;
}

export default numberOfDice;