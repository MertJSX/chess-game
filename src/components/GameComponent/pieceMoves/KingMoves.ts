import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function KingMoves(gameMap: GameMap, mapFrame: MapFrame) {
    let availableMoves: Array<string> = [];
    let currCol = mapFrame.position.col;
    let currRow = mapFrame.position.row;
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
            availableMoves.push(pos)
        }
        let mapFramePiece = mapFrame.piece;
        if (mapFramePiece) {
            if (gameMap.isAvailableToTake(pos, mapFramePiece.color)) {
                availableMoves.push(pos)
            }
        }
    })

    // if (mapFrame.piece?.color === "white") {
        
    // }
    // if (mapFrame.piece?.color === "black") {
        
    // }

    return availableMoves;
}
