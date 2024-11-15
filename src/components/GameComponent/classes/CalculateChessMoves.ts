import MapFrame from "./MapFrame";
import { GameMap } from "./GameMap";
import { PawnMoves } from "../pieceMoves/PawnMoves";
import { KnightMoves } from "../pieceMoves/KnightMoves";
import { BishopMoves } from "../pieceMoves/BishopMoves";
import { RookMoves } from "../pieceMoves/RookMoves";
import { QueenMoves } from "../pieceMoves/QueenMoves";
import { KingMoves } from "../pieceMoves/KingMoves";
import { KingCastles } from "../pieceMoves/KingCastles";
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
    public static Rook(gameMap: GameMap, mapFrame: MapFrame) {
        return RookMoves(gameMap, mapFrame);
    }
    public static Queen(gameMap: GameMap, mapFrame: MapFrame) {
        return QueenMoves(gameMap, mapFrame);
    }
    public static King(gameMap: GameMap, mapFrame: MapFrame) {
        return KingMoves(gameMap, mapFrame);
    }
    public static KingCastles(gameMap: GameMap, mapFrame: MapFrame) {
        return KingCastles(gameMap, mapFrame);
    }
}