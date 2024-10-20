import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
class Knight implements Piece {
    name: PieceName;
    color: string;
    image: string;
    constructor(color: string ) {
        this.name = "Knight";
        this.color = color;
        this.image = "images/pawn.png";
    }
}