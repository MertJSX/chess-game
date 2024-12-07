import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function RookMoves(gameMap: GameMap, mapFrame: MapFrame, onlyIsAvailableToTake: boolean = false, allyColor?: "white" | "black", skipPosition?: string) {
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
    
    function checkPositions(colModifier: number, rowModifier: number) {
        let currWorkPos;
        let currWorkCol = mapFrame.position.col;
        let currWorkRow = mapFrame.position.row;
        let isUnavailable = false;
        while (!isUnavailable) {
            currWorkPos = `${NTL(currWorkCol + colModifier)}${currWorkRow + rowModifier}`;

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
                }
            }
            else if (pieceColor) {
                if (skipPosition) {
                    if (skipPosition === currWorkPos) {
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

    checkPositions(0, 1);
    checkPositions(0, -1);
    checkPositions(-1, 0);
    checkPositions(1, 0);



    return availableMoves;
}
