import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
export class Rook implements Piece {
    name: PieceName;
    color: string;
    image: string;
    public isMoved: boolean = false;
    constructor(color: string ) {
        this.name = "Rook";
        this.color = color;
        this.image = `icons/${this.color}_rook.png`;
    }
}