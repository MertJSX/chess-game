export type PieceName = 'Knight' | 'Queen' | 'King' | 'Rook' | 'Bishop' | 'Pawn';
export interface Piece {
    name: PieceName;
    color: string;
    image: string;
    isMoved: boolean;
}