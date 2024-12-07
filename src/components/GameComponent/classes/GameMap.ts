import MapFrame from "./MapFrame";
import { Rook } from "./pieces/Rook";
import { Knight } from "./pieces/Knight";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";
import { Pawn } from "./pieces/Pawn";
import { Bishop } from "./pieces/Bishop";
import { numberToLetter } from "../utils/numberToLetter";
import { Piece } from "../interfaces/Piece";
import { BishopMoves } from "../pieceMoves/BishopMoves";
import { RookMoves } from "../pieceMoves/RookMoves";
import { KnightMoves } from "../pieceMoves/KnightMoves";
import { PawnMoves } from "../pieceMoves/PawnMoves";
import { numberToLetter as NTL } from "../utils/numberToLetter";

export class GameMap {
  mapFrames: Map<string, MapFrame>;
  whiteKingLocation: string = "e1";
  blackKingLocation: string = "e8";

  constructor(mapFrames?: Map<string, MapFrame>) {
    if (mapFrames) {
      this.mapFrames = mapFrames;
      return;
    }
    this.mapFrames = new Map<string, MapFrame>();

    const colors = ["black", "white"];
    for (let row = 8; row >= 1; row--) {
      for (let col = 1; col <= 8; col++) {
        const positionName = String.fromCharCode(96 + col) + row;
        const color = (row + col) % 2 === 0 ? colors[0] : colors[1];
        this.mapFrames.set(
          `${numberToLetter(col)}${row}`,
          new MapFrame({ row, col }, positionName, color)
        );
      }
    }
    this.initializePieces();
  }

  public isAvailableMove(positionID: string) {
    if (this.mapFrames.has(positionID)) {
      if (this.mapFrames.get(positionID)?.isOccupied) return false;
      else return true;
    }
    return false;
  }
  public isAvailableToTake(positionID: string, color: string, doNotCountIsOccupied: boolean = false) {
    if (this.mapFrames.has(positionID)) {
      if (doNotCountIsOccupied) {
        if (
          this.mapFrames.get(positionID)?.piece?.color !== color
        ) {
          return true;
        }
      } else {
        if (
          this.mapFrames.get(positionID)?.isOccupied &&
          this.mapFrames.get(positionID)?.piece?.color !== color
        ) {
          return true;
        }
      }
    }
    return false;
  }
  public changePosition(
    oldMapFramePosition: string,
    newMapFramePosition: string
  ) {
    let oldMapFrameExists: boolean = this.mapFrames.has(oldMapFramePosition);
    let newMapFrameExists: boolean = this.mapFrames.has(newMapFramePosition);
    if (oldMapFrameExists && newMapFrameExists) {
      let pieceToBeChanged: Piece | null =
        this.mapFrames.get(oldMapFramePosition)?.piece || null;
      this.mapFrames.get(newMapFramePosition)?.SetPiece(pieceToBeChanged);
      this.mapFrames.get(newMapFramePosition)?.SetIsThreatened(false);
      this.mapFrames.get(oldMapFramePosition)?.SetPiece(null);
      this.mapFrames.get(oldMapFramePosition)?.SetIsThreatened(false);
      if (pieceToBeChanged?.name === "King") {
        if (pieceToBeChanged.color === "white") {
          this.whiteKingLocation = newMapFramePosition;
        } else {
          this.blackKingLocation = newMapFramePosition;
        }
      }
    }
  }
  public doCastle(
    castleType: "short" | "long",
    kingMapFramePosition: string,
    rookMapFramePosition: string
  ) {
    if (castleType === "short") {
      let kingMapFrame = this.mapFrames.get(kingMapFramePosition);
      let rookMapFrame = this.mapFrames.get(rookMapFramePosition);

      if (kingMapFrame && rookMapFrame) {
        this.changePosition(
          kingMapFrame.positionName,
          `${NTL(kingMapFrame.position.col + 2)}${kingMapFrame.position.row}`
        );
        this.changePosition(
          rookMapFrame.positionName,
          `${NTL(rookMapFrame.position.col - 2)}${rookMapFrame.position.row}`
        );
      }
    } else if (castleType === "long") {
      let kingMapFrame = this.mapFrames.get(kingMapFramePosition);
      let rookMapFrame = this.mapFrames.get(rookMapFramePosition);

      if (kingMapFrame && rookMapFrame) {
        this.changePosition(
          kingMapFrame.positionName,
          `${NTL(kingMapFrame.position.col - 2)}${kingMapFrame.position.row}`
        );
        this.changePosition(
          rookMapFrame.positionName,
          `${NTL(rookMapFrame.position.col + 3)}${rookMapFrame.position.row}`
        );
      }
    }
  }
  public isThreatenedPosition(
    positionID: string,
    allyColor: "black" | "white",
    skipPosition?: string
  ) {
    let MapFrameOfPosition = this.mapFrames.get(positionID);
    let threateningPositions: string[] = [];
    if (MapFrameOfPosition) {
      let possibleBishops: string[];
      let possibleRooks: string[];
      if (skipPosition) {
        possibleBishops = BishopMoves(
          this,
          MapFrameOfPosition,
          true,
          allyColor,
          skipPosition
        );
        possibleRooks = RookMoves(
          this,
          MapFrameOfPosition,
          true,
          allyColor,
          skipPosition
        );
      } else {
        possibleBishops = BishopMoves(
          this,
          MapFrameOfPosition,
          true,
          allyColor
        );
        possibleRooks = RookMoves(
          this,
          MapFrameOfPosition,
          true,
          allyColor
        );
      }
      let possibleKnights: string[] = KnightMoves(
        this,
        MapFrameOfPosition,
        true,
        allyColor
      );
      let possiblePawns: string[] = PawnMoves(
        this,
        MapFrameOfPosition,
        true,
        allyColor
      );

      possiblePawns.forEach((possiblePawnPosition) => {
        let possiblePawnMapFrame = this.mapFrames.get(possiblePawnPosition);
        if (possiblePawnMapFrame) {
          if (
            possiblePawnMapFrame.piece?.name === "Pawn" ||
            possiblePawnMapFrame.piece?.name === "Queen"
          ) {
            threateningPositions.push(possiblePawnPosition);
          }
        }
      });
      possibleBishops.forEach((possibleBishopPosition) => {
        let possibleBishopMapFrame = this.mapFrames.get(possibleBishopPosition);
        if (possibleBishopMapFrame) {
          if (
            possibleBishopMapFrame.piece?.name === "Bishop" ||
            possibleBishopMapFrame.piece?.name === "Queen"
          ) {
            threateningPositions.push(possibleBishopPosition);
          }
        }
      });
      possibleRooks.forEach((possibleRookPosition) => {
        let possibleBishopMapFrame = this.mapFrames.get(possibleRookPosition);
        if (possibleBishopMapFrame) {
          if (
            possibleBishopMapFrame.piece?.name === "Rook" ||
            possibleBishopMapFrame.piece?.name === "Queen"
          ) {
            threateningPositions.push(possibleRookPosition);
          }
        }
      });
      possibleKnights.forEach((possibleKnightPosition) => {
        let possibleBishopMapFrame = this.mapFrames.get(possibleKnightPosition);
        if (possibleBishopMapFrame) {
          if (possibleBishopMapFrame.piece?.name === "Knight") {
            threateningPositions.push(possibleKnightPosition);
          }
        }
      });
    }

    if (threateningPositions[0]) {
      return true;
    } else {
      return false;
    }
  }
  public areKingsInCheck() {
    if (this.isThreatenedPosition(this.whiteKingLocation, "white")) {
      this.mapFrames.get(this.whiteKingLocation)?.SetIsThreatened(true);
      console.log("White king is threatened!");
    } else {
      this.mapFrames.get(this.whiteKingLocation)?.SetIsThreatened(false);
    }
    if (this.isThreatenedPosition(this.blackKingLocation, "black")) {
      this.mapFrames.get(this.blackKingLocation)?.SetIsThreatened(true);
      console.log("Black king is threatened!");
    } else {
      this.mapFrames.get(this.blackKingLocation)?.SetIsThreatened(false);
    }
  }
  public isKingInCheck() {
    if (this.isThreatenedPosition(this.whiteKingLocation, "white")) {
      return true;
    }
    if (this.isThreatenedPosition(this.blackKingLocation, "black")) {
      return true;
    }
    return false;
  }
  public Contains(positionID: string) {
    if (this.mapFrames.has(positionID)) {
      return true;
    } else {
      return false;
    }
  }
  private initializePieces() {
    // Black
    this.mapFrames.get("a8")?.SetPiece(new Rook("black"), true);
    this.mapFrames.get("b8")?.SetPiece(new Knight("black"), true);
    this.mapFrames.get("c8")?.SetPiece(new Bishop("black"), true);
    this.mapFrames.get("d8")?.SetPiece(new Queen("black"), true);
    this.mapFrames.get("e8")?.SetPiece(new King("black"), true);
    this.mapFrames.get("f8")?.SetPiece(new Bishop("black"), true);
    this.mapFrames.get("g8")?.SetPiece(new Knight("black"), true);
    this.mapFrames.get("h8")?.SetPiece(new Rook("black"), true);
    for (let i = 1; i <= 8; i++) {
      this.mapFrames
        .get(`${numberToLetter(i)}7`)
        ?.SetPiece(new Pawn("black"), true);
    }
    // White
    this.mapFrames.get("a1")?.SetPiece(new Rook("white"), true);
    this.mapFrames.get("b1")?.SetPiece(new Knight("white"), true);
    this.mapFrames.get("c1")?.SetPiece(new Bishop("white"), true);
    this.mapFrames.get("d1")?.SetPiece(new Queen("white"), true);
    this.mapFrames.get("e1")?.SetPiece(new King("white"), true);
    this.mapFrames.get("f1")?.SetPiece(new Bishop("white"), true);
    this.mapFrames.get("g1")?.SetPiece(new Knight("white"), true);
    this.mapFrames.get("h1")?.SetPiece(new Rook("white"), true);
    for (let i = 1; i <= 8; i++) {
      this.mapFrames
        .get(`${numberToLetter(i)}2`)
        ?.SetPiece(new Pawn("white"), true);
    }
  }
}
