import { Piece } from "../interfaces/Piece";
class MapFrame {
    public position: {row: number, col: number};
    public positionName: string;
    public color: string;
    public piece: Piece | null;
    public isOccupied: boolean;
    public isSelected: boolean;
    public isMarked: boolean;

    constructor(position: {row: number, col: number}, positionName: string, color: string, piece?: Piece ) {
        this.position = position;
        this.positionName = positionName;
        this.color = color;
        this.piece = piece || null;
        this.isOccupied = this.piece !== null;
        this.isSelected = false;
        this.isMarked = false;
    }

    public SetPiece(piece?: Piece | null) {
        this.piece = piece || null;
        this.isOccupied = this.piece !== null;
    }

    public SetIsMarked(isMarked: boolean) {
        this.isMarked = isMarked;
    }

    public SetSelected(isSelected: boolean) {
        this.isSelected= isSelected;
    }
}

export default MapFrame;