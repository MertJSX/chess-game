import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
class Bishop implements Piece {
    name: PieceName;
    color: string;
    image: string;
    constructor(color: string ) {
        this.name = "Bishop";
        this.color = color;
        this.image = "images/pawn.png";
    }
}