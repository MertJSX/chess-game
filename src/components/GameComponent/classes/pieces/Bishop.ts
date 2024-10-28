import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
export class Bishop implements Piece {
    name: PieceName;
    color: string;
    image: string;
    isMoved: boolean = true;
    constructor(color: string ) {
        this.name = "Bishop";
        this.color = color;
        this.image = `icons/${this.color}_bishop.png`;
    }
}