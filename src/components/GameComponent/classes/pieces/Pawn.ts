import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
class Pawn implements Piece {
    name: PieceName;
    color: string;
    image: string;
    constructor(color: string ) {
        this.name = "Pawn";
        this.color = color;
        this.image = "images/pawn.png";
    }
}