import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function BishopMoves(gameMap: GameMap, mapFrame: MapFrame) {
    let availableMoves: Array<string> = [];
    // let currCol = mapFrame.position.col;
    // let currRow = mapFrame.position.row;

    // positionsForCheck.forEach((pos) => {
    //     if (gameMap.isAvailableMove(pos)) {
    //         availableMoves.push(pos)
    //     }
    //     let mapFramePiece = mapFrame.piece;
    //     if (mapFramePiece) {
    //         if (gameMap.isAvailableToTake(pos, mapFramePiece.color)) {
    //             availableMoves.push(pos)
    //         }
    //     }
    // })

    
    function checkPositions(colModifier: number, rowModifier: number) {
        let currWorkPos;
        let currWorkCol = mapFrame.position.col;
        let currWorkRow = mapFrame.position.row;
        let isUnavailable = false;
        while (!isUnavailable) {
            currWorkPos = `${NTL(currWorkCol + colModifier)}${currWorkRow + rowModifier}`;
            console.log(5 + -1);
            
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

    checkPositions(1, 1);
    checkPositions(-1, 1);
    checkPositions(1, -1);
    checkPositions(-1, -1);



    return availableMoves;
}
