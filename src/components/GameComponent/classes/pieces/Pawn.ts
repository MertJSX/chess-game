import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
export class Pawn implements Piece {
    name: PieceName;
    color: string;
    image: string;
    public isMoved: boolean = true;
    constructor(color: string ) {
        this.name = "Pawn";
        this.color = color;
        this.image = `icons/${this.color}_pawn.png`;
    }
}