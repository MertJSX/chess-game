import MapFrame from "./MapFrame";
import { Rook } from "./pieces/Rook";
import { Knight } from "./pieces/Knight";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";
import { Pawn } from "./pieces/Pawn";
import { Bishop } from "./pieces/Bishop";
import { numberToLetter } from "../utils/numberToLetter";
export class GameMap {
    mapFrames: Map<string, MapFrame>;
    constructor(mapFrames?: Map<string, MapFrame>) {
        if (mapFrames) {
            this.mapFrames = mapFrames;
            return;
        }
        this.mapFrames = new Map<string, MapFrame>();
        
        const colors = ['black', 'white'];
        for (let row = 8; row >= 1; row--) { 
            for (let col = 1; col <= 8; col++) {
                const positionName = String.fromCharCode(96 + col) + row;
                const color = (row + col) % 2 === 0 ? colors[0] : colors[1];
                this.mapFrames.set(`${numberToLetter(col)}${row}`, new MapFrame({row, col}, positionName, color))
                // this.map.push(new MapFrame({ row, col }, positionName, color));
            }
        }
        this.initializePieces();
    }

    public isAvailableMove(moveID: string) {
        if (this.mapFrames.has(moveID)) {
            if (this.mapFrames.get(moveID)?.isOccupied)
                return false;
            else 
                return true;
        }
        return false;
    }
    public isAvailableToTake(moveID: string, color: string) {
        if (this.mapFrames.has(moveID)) {
            if ((this.mapFrames.get(moveID)?.isOccupied) && this.mapFrames.get(moveID)?.color !== color)
                return true;
        }
        return false;
    }

    private initializePieces() {
        // Black
        this.mapFrames.get("a8")?.SetPiece(new Rook("black"));
        this.mapFrames.get("b8")?.SetPiece(new Knight("black"));
        this.mapFrames.get("c8")?.SetPiece(new Bishop("black"));
        this.mapFrames.get("d8")?.SetPiece(new Queen("black"));
        this.mapFrames.get("e8")?.SetPiece(new King("black"));
        this.mapFrames.get("f8")?.SetPiece(new Bishop("black"));
        this.mapFrames.get("g8")?.SetPiece(new Knight("black"));
        this.mapFrames.get("h8")?.SetPiece(new Rook("black"));
        for (let i = 1; i <= 8; i++) {
            this.mapFrames.get(`${numberToLetter(i)}7`)?.SetPiece(new Pawn("black"));
        }
        // White
        this.mapFrames.get("a1")?.SetPiece(new Rook("white"));
        this.mapFrames.get("b1")?.SetPiece(new Knight("white"));
        this.mapFrames.get("c1")?.SetPiece(new Bishop("white"));
        this.mapFrames.get("d1")?.SetPiece(new Queen("white"));
        this.mapFrames.get("e1")?.SetPiece(new King("white"));
        this.mapFrames.get("f1")?.SetPiece(new Bishop("white"));
        this.mapFrames.get("g1")?.SetPiece(new Knight("white"));
        this.mapFrames.get("h1")?.SetPiece(new Rook("white"));
        for (let i = 1; i <= 8; i++) {
            this.mapFrames.get(`${numberToLetter(i)}2`)?.SetPiece(new Pawn("white"));
        }
    }
}