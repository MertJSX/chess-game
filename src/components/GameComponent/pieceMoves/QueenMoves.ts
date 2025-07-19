import { GameMap } from "../classes/GameMap";
import MapFrame from "../classes/MapFrame";
import { RookMoves } from "./RookMoves";
import { BishopMoves } from "./BishopMoves";

export function QueenMoves(gameMap: GameMap, mapFrame: MapFrame) {
  let availableMoves: Array<string> = [];
  let pieceColor: "white" | "black" =
    mapFrame.piece?.color === "black" ? "black" : "white";

  let bishopMoves = BishopMoves(
    gameMap,
    mapFrame,
    false,
    pieceColor,
    undefined,
    undefined,
    true
  );
  let rookMoves = RookMoves(
    gameMap,
    mapFrame,
    false,
    pieceColor,
    undefined,
    undefined,
    true
  );

  bishopMoves.forEach((move) => {
    availableMoves.push(move);
  });
  rookMoves.forEach((move) => {
    availableMoves.push(move);
  });

  return availableMoves;
}
