import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { RookMoves } from "./RookMoves";
import { BishopMoves } from "./BishopMoves";

export function QueenMoves(gameMap: GameMap, mapFrame: MapFrame) {
    let availableMoves: Array<string> = [];
    let bishopMoves = BishopMoves(gameMap, mapFrame);
    let rookMoves = RookMoves(gameMap, mapFrame);
    
    bishopMoves.forEach((move) => {
        availableMoves.push(move)
    })
    rookMoves.forEach((move) => {
        availableMoves.push(move)
    })

    return availableMoves;
}
