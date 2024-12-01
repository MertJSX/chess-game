import { GameMap } from "./GameMap";

export class ChessGame {
    turn: "white" | "black" = "white";
    gameMode: "1v1" | "sandbox";
    gameMap: GameMap;

    constructor(chessGameMap: GameMap, gameMode: "1v1" | "sandbox") {
        this.gameMap = chessGameMap;
        this.gameMode = gameMode;
    }

    public setGameMap(gameMap: GameMap) {
        this.gameMap = gameMap;
    }

    public changeTurn() {
        if (this.turn === "white") {
            this.turn = "black";
        } else {
            this.turn = "white";
        }
    }
}