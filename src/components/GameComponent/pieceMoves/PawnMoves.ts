import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { numberToLetter } from "../utils/numberToLetter";

export function PawnMoves(gameMap: GameMap, mapFrame: MapFrame) {
    let availableMoves: Array<string> = [];

    if (mapFrame.piece?.color === "white") {
        let move: string = `${numberToLetter(mapFrame.position.col)}${mapFrame.position.row + 1}`;
        if (gameMap.isAvailableMove(move)) {
            availableMoves.push(move);
            if (mapFrame.position.row === 2) {
                move = `${numberToLetter(mapFrame.position.col)}${mapFrame.position.row + 2}`;
                availableMoves.push(move);
            }
        }
    }
    if (mapFrame.piece?.color === "black") {
        let move: string = `${numberToLetter(mapFrame.position.col)}${mapFrame.position.row - 1}`;

        if (gameMap.isAvailableMove(move)) {
            availableMoves.push(move);
            if (mapFrame.position.row === 7) {
                move = `${numberToLetter(mapFrame.position.col)}${mapFrame.position.row - 2}`;
                availableMoves.push(move);
            }
        }
    }

    return availableMoves;
}
