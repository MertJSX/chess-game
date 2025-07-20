import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function RookMoves(
  gameMap: GameMap,
  mapFrame: MapFrame,
  onlyIsAvailableToTake: boolean = false,
  allyColor?: "white" | "black",
  skipPosition?: string,
  hitPosition?: string,
  bypassKingProtection: boolean = false,
  returnOnlyIfSkipPositionIsSkipped: boolean = false
) : string[] {
  let isSkipPositionIsSkipped: boolean = false;

  let availableMoves: Array<string> = [];

  function checkPositions(colModifier: number, rowModifier: number) {
    let currWorkPos;
    let currWorkCol = mapFrame.position.col;
    let currWorkRow = mapFrame.position.row;
    let isUnavailable = false;
    let checkMoves: Array<string> = [];

    while (!isUnavailable) {
      currWorkPos = `${NTL(currWorkCol + colModifier)}${
        currWorkRow + rowModifier
      }`;

      if (!gameMap.Contains(currWorkPos)) {
        isUnavailable = true;
        break;
      }

      currWorkCol += colModifier;
      currWorkRow += rowModifier;

      let pieceColor = allyColor ?? mapFrame.piece?.color;

      if (gameMap.isAvailableMove(currWorkPos)) {
        if (!onlyIsAvailableToTake) {
          checkMoves.push(currWorkPos);
        } else if (currWorkPos === hitPosition) {
          checkMoves.push(currWorkPos);
          isUnavailable = true;
        }
      } else if (pieceColor) {
        if (skipPosition) {
          if (skipPosition === currWorkPos) {
            isSkipPositionIsSkipped = true;
            continue;
          }
        }
        if (gameMap.isAvailableToTake(currWorkPos, pieceColor)) {
          checkMoves.push(currWorkPos);
          isUnavailable = true;
        } else {
          isUnavailable = true;
        }
      } else {
        isUnavailable = true;
      }
    }

    if (checkMoves.length > 0) {
      availableMoves.push(...checkMoves)
    } else {
      isSkipPositionIsSkipped = false;
    }
  }

  checkPositions(0, 1);
  checkPositions(0, -1);
  checkPositions(-1, 0);
  checkPositions(1, 0);

  if (isSkipPositionIsSkipped && returnOnlyIfSkipPositionIsSkipped) {
    return availableMoves;
  } else if (returnOnlyIfSkipPositionIsSkipped) {
    return [];
  }

  return availableMoves;

}
