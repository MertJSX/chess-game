import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
export class King implements Piece {
    name: PieceName;
    color: string;
    image: string;
    isMoved: boolean = true;
    constructor(color: string ) {
        this.name = "King";
        this.color = color;
        this.image = `icons/${this.color}_king.png`;
    }
}