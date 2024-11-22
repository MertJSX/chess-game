import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function KingMoves(gameMap: GameMap, mapFrame: MapFrame) {
    let availableMoves: Array<string> = [];
    let currCol = mapFrame.position.col;
    let currRow = mapFrame.position.row;
    let pieceColor = mapFrame.piece?.color;
    let positionsForCheck: string[] = [
        `${NTL(currCol + 1)}${currRow + 1}`,
        `${NTL(currCol - 1)}${currRow - 1}`,
        `${NTL(currCol + 1)}${currRow - 1}`,
        `${NTL(currCol - 1)}${currRow + 1}`,
        `${NTL(currCol - 1)}${currRow}`,
        `${NTL(currCol + 1)}${currRow}`,
        `${NTL(currCol)}${currRow - 1}`,
        `${NTL(currCol)}${currRow + 1}`,
    ]

    positionsForCheck.forEach((pos) => {
        if (gameMap.isAvailableMove(pos)) {
            if (pieceColor === "black" || pieceColor === "white") {
                console.log(pos);
                
                if (!gameMap.isThreatenedPosition(pos, pieceColor, mapFrame.positionName)) {
                    console.log(!gameMap.isThreatenedPosition(pos, pieceColor, mapFrame.positionName));
                    
                    availableMoves.push(pos)
                }
            }
        }
        let mapFramePiece = mapFrame.piece;
        if (mapFramePiece) {
            if (gameMap.isAvailableToTake(pos, mapFramePiece.color)) {
                if (pieceColor === "black" || pieceColor === "white") {
                    if (!gameMap.isThreatenedPosition(pos, pieceColor, mapFrame.positionName)) {
                        availableMoves.push(pos)
                    }
                }
            }
        }
    })

    return availableMoves;
}
