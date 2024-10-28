import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function RookMoves(gameMap: GameMap, mapFrame: MapFrame) {
    let availableMoves: Array<string> = [];
    
    function checkPositions(colModifier: number, rowModifier: number) {
        let currWorkPos;
        let currWorkCol = mapFrame.position.col;
        let currWorkRow = mapFrame.position.row;
        let isUnavailable = false;
        while (!isUnavailable) {
            currWorkPos = `${NTL(currWorkCol + colModifier)}${currWorkRow + rowModifier}`;
            
            currWorkCol += colModifier;
            currWorkRow += rowModifier;

            let pieceColor = mapFrame.piece?.color;
            if (gameMap.isAvailableMove(currWorkPos)) {
                availableMoves.push(currWorkPos);
            }
            else if (pieceColor) {
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

    checkPositions(0, 1);
    checkPositions(0, -1);
    checkPositions(-1, 0);
    checkPositions(1, 0);



    return availableMoves;
}
