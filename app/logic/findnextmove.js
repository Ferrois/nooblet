import isEqual from "../utilities/isEqual";

function checkRoadTile(tiles, position) {
  return tiles.find((tile) => isEqual(tile.position, position) && tile.walkable === true);
}

function directionToIdx(direction) {
  if (isEqual(direction, [1, 0])) {
    return 0;
  }
  if (isEqual(direction, [0, 1])) {
    return 1;
  }
  if (isEqual(direction, [-1, 0])) {
    return 2;
  }
  if (isEqual(direction, [0, -1])) {
    return 3;
  }
}
function idxToDirection(idx) {
  switch (idx) {
    case 0:
      return [1, 0];
    case 1:
      return [0, 1];
    case 2:
      return [-1, 0];
    case 3:
      return [0, -1];
  }
}

function findNextMove(tiles, player) {
  //   const [dx, dy] = direction;
  const [x, y] = player.position;
  const direction = player.direction;

  let directionIdx = directionToIdx(direction);

  const frontDir = direction;
  const leftDir = idxToDirection((directionIdx + 1) % 4);
  const rightDir = idxToDirection((directionIdx + 3) % 4);
  const backDir = idxToDirection((directionIdx + 2) % 4);

  const frontPos = [x + frontDir[0], y + frontDir[1]];
  const leftPos = [x + leftDir[0], y + leftDir[1]];
  const rightPos = [x + rightDir[0], y + rightDir[1]];
  const backPos = [x + backDir[0], y + backDir[1]];

  const randomFloat = Math.random() * 3;
  const isFrontAvailable = checkRoadTile(tiles, frontPos);
  const isLeftAvailable = checkRoadTile(tiles, leftPos);
  const isRightAvailable = checkRoadTile(tiles, rightPos);

  if (isLeftAvailable && isRightAvailable && isFrontAvailable) {
    if (randomFloat < 1) {
      return { newPosition: leftPos, newDirection: leftDir };
    } else if (randomFloat < 2) {
      return { newPosition: rightPos, newDirection: rightDir };
    } else {
      return { newPosition: frontPos, newDirection: frontDir };
    }
  }
  if (isLeftAvailable && isRightAvailable) {
    if (randomFloat < 1.5) {
      return { newPosition: leftPos, newDirection: leftDir };
    } else {
      return { newPosition: rightPos, newDirection: rightDir };
    }
  }
  if (isLeftAvailable && isFrontAvailable) {
    if (randomFloat < 1.5) {
      return { newPosition: leftPos, newDirection: leftDir };
    } else {
      return { newPosition: frontPos, newDirection: frontDir };
    }
  }
  if (isRightAvailable && isFrontAvailable) {
    if (randomFloat < 1.5) {
      return { newPosition: rightPos, newDirection: rightDir };
    } else {
      return { newPosition: frontPos, newDirection: frontDir };
    }
  }
  if (isFrontAvailable) {
    return { newPosition: frontPos, newDirection: frontDir };
  }
  if (isLeftAvailable) {
    return { newPosition: leftPos, newDirection: leftDir };
  }
  if (isRightAvailable) {
    return { newPosition: rightPos, newDirection: rightDir };
  }
  return { newPosition: backPos, newDirection: backDir };
}

export { findNextMove, checkRoadTile, directionToIdx, idxToDirection };
