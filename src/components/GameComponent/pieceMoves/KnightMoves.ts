import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function KnightMoves(gameMap: GameMap, mapFrame: MapFrame, onlyIsAvailableToTake: boolean = false, allyColor?: "white" | "black") {
    let isKingInCheckWithoutThisPiecePosition: boolean = false;
    if (!allyColor && !onlyIsAvailableToTake) {
        if (mapFrame.piece?.color === "white") {
            isKingInCheckWithoutThisPiecePosition = gameMap.isThreatenedPosition(gameMap.whiteKingLocation, "white", mapFrame.positionName);
        }
        if (mapFrame.piece?.color === "black") {
            isKingInCheckWithoutThisPiecePosition = gameMap.isThreatenedPosition(gameMap.blackKingLocation, "black", mapFrame.positionName);
        }
        if (isKingInCheckWithoutThisPiecePosition) {
            return [];
        }
    }
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
