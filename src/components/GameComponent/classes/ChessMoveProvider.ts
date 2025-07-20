import MapFrame from "./MapFrame";
import { GameMap } from "./GameMap";
import { CalculateChessMoves } from "./CalculateChessMoves";
export class ChessMoveProvider {
  public static Provide(
    gameMap: GameMap,
    item: MapFrame,
    markedItems: string[],
    setMarkedItems: React.Dispatch<string[]>,
    setMarkedPossibleCastles: React.Dispatch<string[]>
  ) {
    let possibleMoves: Array<string> = [];
    let possibleCastles: Array<string> = [];
    let isKingInCheckWithoutThisPiecePosition: boolean = false;
    let selectedFrame = gameMap.mapFrames.get(item.positionName);
    let pieceColor: "white" | "black" =
      selectedFrame?.piece?.color === "black"
        ? selectedFrame.piece.color
        : "white";
    if (markedItems[0] !== undefined) {
      markedItems.forEach((markedItem) => {
        gameMap.mapFrames.get(markedItem)?.SetIsMarked(false);
      });
    }
    function setPossibleMoves() {
      if (possibleMoves) {
        possibleMoves.forEach((cordinate) => {
          gameMap.mapFrames.get(cordinate)?.SetIsMarked(true);
        });
        setMarkedItems(possibleMoves);
      }
    }
    function setPossibleCastles() {
      if (possibleCastles) {
        possibleCastles.forEach((cordinate) => {
          gameMap.mapFrames.get(cordinate)?.SetIsMarkedForCastle(true);
        });
      }
      setMarkedPossibleCastles(possibleCastles);
    }

    if (selectedFrame?.piece?.name !== "King") {
        isKingInCheckWithoutThisPiecePosition = gameMap.isThreatenedPosition(
          pieceColor === "white"
            ? gameMap.whiteKingLocation
            : gameMap.blackKingLocation,
          pieceColor,
          selectedFrame?.positionName,
          "",
          true
        );
    
        if (isKingInCheckWithoutThisPiecePosition) {
          return [];
        }
    }

    switch (item.piece?.name) {
      case "Pawn":
        if (selectedFrame) {
          possibleMoves = CalculateChessMoves.Pawn(gameMap, selectedFrame);
        }
        break;
      case "Knight":
        if (selectedFrame) {
          possibleMoves = CalculateChessMoves.Knight(gameMap, selectedFrame);
        }
        break;
      case "Bishop":
        if (selectedFrame) {
          possibleMoves = CalculateChessMoves.Bishop(gameMap, selectedFrame);
        }
        break;
      case "Rook":
        if (selectedFrame) {
          possibleMoves = CalculateChessMoves.Rook(gameMap, selectedFrame);
        }
        break;
      case "Queen":
        if (selectedFrame) {
          possibleMoves = CalculateChessMoves.Queen(gameMap, selectedFrame);
        }
        break;
      case "King":
        if (selectedFrame) {
          possibleMoves = CalculateChessMoves.King(gameMap, selectedFrame);
          possibleCastles = CalculateChessMoves.KingCastles(
            gameMap,
            selectedFrame
          );

          setPossibleMoves();
          setPossibleCastles();

          return possibleMoves;
        }
        break;
    }    
    if (gameMap.isKingInCheck()) {
      possibleMoves = possibleMoves.filter((move) => {
        return !gameMap.isThreatenedPosition(
          pieceColor === "white"
            ? gameMap.whiteKingLocation
            : gameMap.blackKingLocation,
          pieceColor,
          "",
          move
        );
      });
    }

    setPossibleMoves();

    return possibleMoves;
  }
}
