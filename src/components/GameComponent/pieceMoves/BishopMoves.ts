import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function BishopMoves(
  gameMap: GameMap,
  mapFrame: MapFrame,
  onlyIsAvailableToTake: boolean = false,
  allyColor?: "white" | "black",
  skipPosition?: string,
  hitPosition?: string,
  bypassKingProtection: boolean = false,
  returnOnlyIfSkipPositionIsSkipped: boolean = false
): string[] {
  let isSkipPositionIsSkipped: boolean = false;
  
  let availableMoves: Array<string> = [];

  function checkPositions(colModifier: number, rowModifier: number) {
    let currWorkPos;
    let currWorkCol = mapFrame.position.col;
    let currWorkRow = mapFrame.position.row;
    let isUnavailable = false;

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
          availableMoves.push(currWorkPos);
        } else if (currWorkPos === hitPosition) {
          availableMoves.push(currWorkPos);
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
          availableMoves.push(currWorkPos);
          isUnavailable = true;
        } else {
          isUnavailable = true;
        }
      } else {
        isUnavailable = true;
      }
    }
  }

  checkPositions(1, 1);
  checkPositions(-1, 1);
  checkPositions(1, -1);
  checkPositions(-1, -1);

  if (isSkipPositionIsSkipped && returnOnlyIfSkipPositionIsSkipped) {
    console.log(`${skipPosition} IS SKIPPED!`);

    return availableMoves;
  } else if (returnOnlyIfSkipPositionIsSkipped) {
    console.log(`${skipPosition} IS NOT SKIPPED!`);

    return [];
  }

  return availableMoves;
}
