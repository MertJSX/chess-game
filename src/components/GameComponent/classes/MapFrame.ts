import { Piece } from "../interfaces/Piece";
class MapFrame {
    position: {row: number, col: number};
    positionName: string;
    color: string;
    piece: Piece | null;
    isOccupied: boolean;

    constructor(position: {row: number, col: number}, positionName: string, color: string, piece?: Piece ) {
        this.position = position;
        this.positionName = positionName;
        this.color = color;
        this.piece = piece || null;
        this.isOccupied = this.piece !== null;
    }

    SetPiece(piece?: Piece) {
        this.piece = piece || null;
        this.isOccupied = this.piece !== null;
    }
}

export default MapFrame;