import { Piece } from "../../interfaces/Piece";
import { PieceName } from "../../interfaces/Piece";
export class Knight implements Piece {
    name: PieceName;
    color: string;
    image: string;
    constructor(color: string ) {
        this.name = "Knight";
        this.color = color;
        this.image = `icons/${this.color}_knight.png`;
    }
}