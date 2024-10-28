import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export function PawnMoves(gameMap: GameMap, mapFrame: MapFrame) {
    let availableMoves: Array<string> = [];
    let whiteTakePossitionsForCheck = [
        `${NTL(mapFrame.position.col + 1)}${mapFrame.position.row + 1}`,
        `${NTL(mapFrame.position.col - 1)}${mapFrame.position.row + 1}`
    ];
    let blackTakePossitionsForCheck = [
        `${NTL(mapFrame.position.col + 1)}${mapFrame.position.row - 1}`,
        `${NTL(mapFrame.position.col - 1)}${mapFrame.position.row - 1}`
    ];

    if (mapFrame.piece?.color === "white") {
        let move: string = `${NTL(mapFrame.position.col)}${mapFrame.position.row + 1}`;
        if (gameMap.isAvailableMove(move)) {
            availableMoves.push(move);
            if (mapFrame.position.row === 2) {
                move = `${NTL(mapFrame.position.col)}${mapFrame.position.row + 2}`;
                if (gameMap.isAvailableMove(move)) {
                    availableMoves.push(move);
                }
            }
        }
        whiteTakePossitionsForCheck.forEach((pos) => {
            let mapFramePiece = mapFrame.piece;
            if (mapFramePiece) {
                if (gameMap.isAvailableToTake(pos, mapFramePiece.color)) {
                    availableMoves.push(pos);
                }
            }
        })
    }
    if (mapFrame.piece?.color === "black") {
        let move: string = `${NTL(mapFrame.position.col)}${mapFrame.position.row - 1}`;

        if (gameMap.isAvailableMove(move)) {
            availableMoves.push(move);
            if (mapFrame.position.row === 7) {
                move = `${NTL(mapFrame.position.col)}${mapFrame.position.row - 2}`;
                if (gameMap.isAvailableMove(move)) {
                    availableMoves.push(move);
                }
            }
        }
        blackTakePossitionsForCheck.forEach((pos) => {
            let mapFramePiece = mapFrame.piece;
            if (mapFramePiece) {
                if (gameMap.isAvailableToTake(pos, mapFramePiece.color)) {
                    availableMoves.push(pos);
                }
            }
        })
    }

    return availableMoves;
}
