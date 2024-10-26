import MapFrame from "./MapFrame";
import { GameMap } from "./GameMap";
import { CalculateChessMoves } from "./CalculateChessMoves";
export class ChessMoveProvider {
    public static Provide(gameMap: GameMap, item: MapFrame, markedItems: string[], setMarkedItems: React.Dispatch<string[]>) {
        let possibleMoves: Array<string>;
        let selectedFrame = gameMap.mapFrames.get(item.positionName);
        if (markedItems[0] !== undefined) {
            markedItems.forEach((markedItem) => {
                gameMap.mapFrames.get(markedItem)?.SetIsMarked(false);
            })
        }
        function setPossibleMoves() {
            if (possibleMoves) {
                possibleMoves.forEach((cordinate) => {
                    gameMap.mapFrames.get(cordinate)?.SetIsMarked(true);
                })
                setMarkedItems(possibleMoves);
            }
        }
        switch (item.piece?.name) {
            case "Pawn":
                if (selectedFrame) {
                    possibleMoves = CalculateChessMoves.Pawn(gameMap, selectedFrame);

                    setPossibleMoves()

                    return possibleMoves;
                }
                break;
            case "Knight":
                if (selectedFrame) {
                    possibleMoves = CalculateChessMoves.Knight(gameMap, selectedFrame);

                    setPossibleMoves()

                    return possibleMoves;
                }
        }
    }
}