import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function KingCastles(gameMap: GameMap, mapFrame: MapFrame) {
  let availableCastles: Array<string> = [];
  let currCol = mapFrame.position.col;
  let currRow = mapFrame.position.row;
  
  if (mapFrame.piece?.isMoved) {
    return [];
  }

  if (mapFrame.piece?.name !== "King") {
    return [];
  }

  let shortCastle = {
    rookPosition: `${NTL(currCol + 3)}${currRow}`,
    mustBeFreePositions: [
      `${NTL(currCol + 1)}${currRow}`,
      `${NTL(currCol + 2)}${currRow}`,
    ],
  };
  let longCastle = {
    rookPosition: `${NTL(currCol - 4)}${currRow}`,
    mustBeFreePositions: [
      `${NTL(currCol - 1)}${currRow}`,
      `${NTL(currCol - 2)}${currRow}`,
      `${NTL(currCol - 3)}${currRow}`,
    ],
  };

  console.log(shortCastle.mustBeFreePositions);
  

  let checkShortRook = gameMap.mapFrames.get(shortCastle.rookPosition)?.piece
    ?.isMoved;
  let checkLongRook = gameMap.mapFrames.get(longCastle.rookPosition)?.piece
    ?.isMoved;
  
  if (!checkShortRook) {
    let allPositionsAreFree: boolean = true;
    shortCastle.mustBeFreePositions.forEach((pos) => {
      if (!gameMap.isAvailableMove(pos)) {
        allPositionsAreFree = false;
        return;
      }
    });
    if (allPositionsAreFree && gameMap.mapFrames.get(shortCastle.rookPosition)?.piece?.color === mapFrame.piece?.color) {
        availableCastles.push(shortCastle.rookPosition);
    }
  }

  if (!checkLongRook) {
    let allPositionsAreFree: boolean = true;    
    longCastle.mustBeFreePositions.forEach((pos) => {
      if (!gameMap.isAvailableMove(pos)) {
        allPositionsAreFree = false;
        return;
      }
    });
    console.log(gameMap.mapFrames.get(longCastle.rookPosition)?.color);
    console.log(mapFrame.piece?.color);
    
    
    if (allPositionsAreFree && gameMap.mapFrames.get(longCastle.rookPosition)?.piece?.color === mapFrame.piece?.color) {
        availableCastles.push(longCastle.rookPosition);
    }
  }
  

  return availableCastles;
}
