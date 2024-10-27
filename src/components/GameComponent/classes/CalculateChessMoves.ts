import MapFrame from "./MapFrame";
import { GameMap } from "./GameMap";
import { PawnMoves } from "../pieceMoves/PawnMoves";
import { KnightMoves } from "../pieceMoves/KnightMoves";
import { BishopMoves } from "../pieceMoves/BishopMoves";
export class CalculateChessMoves {
    public static Pawn(gameMap: GameMap, mapFrame: MapFrame) {
        return PawnMoves(gameMap, mapFrame);
    }
    public static Knight(gameMap: GameMap, mapFrame: MapFrame) {
        return KnightMoves(gameMap, mapFrame);
    }
    public static Bishop(gameMap: GameMap, mapFrame: MapFrame) {
        return BishopMoves(gameMap, mapFrame);
    }
}