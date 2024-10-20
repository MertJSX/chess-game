import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
class King implements Piece {
    name: PieceName;
    color: string;
    image: string;
    constructor(color: string ) {
        this.name = "King";
        this.color = color;
        this.image = "images/king.png";
    }
}