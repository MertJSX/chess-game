import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
export class Queen implements Piece {
    name: PieceName;
    color: string;
    image: string;
    isMoved: boolean = true;
    constructor(color: string ) {
        this.name = "Queen";
        this.color = color;
        this.image = `icons/${this.color}_queen.png`;
    }
}