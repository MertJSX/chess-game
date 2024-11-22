import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function KnightMoves(gameMap: GameMap, mapFrame: MapFrame, onlyIsAvailableToTake: boolean = false, allyColor?: "white" | "black") {
    let availableMoves: Array<string> = [];
    let currCol = mapFrame.position.col;
    let currRow = mapFrame.position.row;
    let positionsForCheck: string[] = [
        `${NTL(currCol + 1)}${currRow + 2}`,
        `${NTL(currCol - 1)}${currRow + 2}`,
        `${NTL(currCol + 1)}${currRow - 2}`,
        `${NTL(currCol - 1)}${currRow - 2}`,
        `${NTL(currCol + 2)}${currRow - 1}`,
        `${NTL(currCol + 2)}${currRow + 1}`,
        `${NTL(currCol - 2)}${currRow - 1}`,
        `${NTL(currCol - 2)}${currRow + 1}`,
    ]

    positionsForCheck.forEach((pos) => {
        if (gameMap.isAvailableMove(pos)) {
            if (!onlyIsAvailableToTake) {
                availableMoves.push(pos);
            }
        }
        let mapFramePieceColor = allyColor ?? mapFrame.piece?.color;
        if (mapFramePieceColor) {
            if (gameMap.isAvailableToTake(pos, mapFramePieceColor, allyColor ? true : false)) {
                availableMoves.push(pos)
            }
        }
    })

    return availableMoves;
}
