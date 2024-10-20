import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
class Queen implements Piece {
    name: PieceName;
    color: string;
    image: string;
    constructor(color: string ) {
        this.name = "Queen";
        this.color = color;
        this.image = "images/pawn.png";
    }
}