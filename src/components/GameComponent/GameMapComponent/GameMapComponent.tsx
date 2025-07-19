import React, { useEffect, useRef, useState } from 'react';
import { GameMap } from '../classes/GameMap';
import { TbPointFilled } from "react-icons/tb";
import { ChessMoveProvider } from '../classes/ChessMoveProvider';
import { colPlaceForCoordinate, rowPlaceForCoordinate } from '../utils/placeForCoordinate';
import MapFrame from '../classes/MapFrame';
import { ChessGame } from '../classes/ChessGame';

interface GameMapProps {
  gameMap: GameMap,
  setGameMap: React.Dispatch<React.SetStateAction<GameMap>>,
  selectedItem: string,
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>,
  markedItems: string[],
  setMarkedItems: React.Dispatch<string[]>,
  markedPossibleCastles: string[],
  setMarkedPossibleCastles: React.Dispatch<string[]>,
  chessGame: ChessGame,
  setChessGame: React.Dispatch<ChessGame>
}

const GameMapComponent: React.FC<GameMapProps> = ({ gameMap, setGameMap, selectedItem, setSelectedItem, markedItems, setMarkedItems, markedPossibleCastles, setMarkedPossibleCastles, chessGame, setChessGame }) => {
  const [arrayFromGameMap, setArrayFromGameMap] = useState<Array<MapFrame>>(Array.from(gameMap.mapFrames.values()));
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [flipBoard, setFlipBoard] = React.useState<boolean>(false);
  const [autoFlipBoard, setAutoFlipBoard] = React.useState<boolean>(false);
  const mapElements = useRef(null)

  useEffect(() => {
    if (flipBoard) {
      setArrayFromGameMap(Array.from(gameMap.mapFrames.values()).reverse());
    } else {
      setArrayFromGameMap(Array.from(gameMap.mapFrames.values()))
    }
  }, [flipBoard, gameMap.mapFrames])

  return (
    <div>
      <section
        ref={mapElements}
        className={`flex flex-wrap w-[324px] md:w-[644px] m-auto border-2 border-black mt-2`}>
        {
          arrayFromGameMap
            .map((item) => (
              <article
                onMouseEnter={() => {
                  if (selectedItem !== "" && item.isMarked) {
                    setHoveredItem(item.positionName);
                  }
                }}
                onMouseLeave={() => {
                  // if (selectedItem === "") {
                    setHoveredItem(null);
                  // }
                }}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  if (item.isMarked) {
                    gameMap.changePosition(selectedItem, item.positionName);

                    gameMap.mapFrames.get(selectedItem)?.SetSelected(false);
                    markedItems.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarked(false);
                    })
                    markedPossibleCastles.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarkedForCastle(false);
                    })
                    gameMap.areKingsInCheck();

                    setSelectedItem("");
                    setMarkedItems([]);
                    setMarkedPossibleCastles([]);
                    setHoveredItem(null);
                    chessGame.changeTurn();
                    if (autoFlipBoard) {
                      setFlipBoard(!flipBoard);
                    }
                    setGameMap(gameMap);
                  }
                  else if (item.isMarkedForCastle) {
                    let castleMapFrame = gameMap.mapFrames.get(item.positionName);
                    if (castleMapFrame?.position.col === 1) {
                      gameMap.doCastle("long" ,selectedItem, item.positionName);
                    }
                    else {
                      gameMap.doCastle("short",selectedItem, item.positionName);
                    }

                    gameMap.mapFrames.get(selectedItem)?.SetSelected(false);
                    markedItems.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarked(false);
                    })
                    markedPossibleCastles.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarkedForCastle(false);
                    })

                    setSelectedItem("");
                    setMarkedItems([]);
                    setMarkedPossibleCastles([]);
                    chessGame.changeTurn();
                    if (autoFlipBoard) {
                      setFlipBoard(!flipBoard);
                    }
                    setGameMap(gameMap);
                  }
                  else if (!item.isSelected && item.piece) {
                    if (chessGame.turn === "black" && item.piece.color !== "black") {
                      if (chessGame.gameMode !== "sandbox") {
                        return
                      }
                    }
                    if (chessGame.turn === "white" && item.piece.color !== "white") {
                      if (chessGame.gameMode !== "sandbox") {
                        return
                      }
                    }
                    // if (gameMap.isKingInCheck() && chessGame.gameMode !== "sandbox" && item.piece.name !== "King") {
                    //   return
                    // }
                    gameMap.mapFrames.get(selectedItem)?.SetSelected(false);
                    markedItems.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarked(false);
                    })
                    markedPossibleCastles.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarkedForCastle(false);
                    })

                    gameMap.mapFrames.get(item.positionName)?.SetSelected(true);
                    setSelectedItem(item.positionName);

                    ChessMoveProvider.Provide(gameMap, item, markedItems, setMarkedItems, setMarkedPossibleCastles)

                    setGameMap(gameMap);
                  } else if (selectedItem !== null && item.isMarked === false && item.isMarkedForCastle === false) {
                    gameMap.mapFrames.get(selectedItem)?.SetSelected(false);
                    markedItems.forEach((markedMapFrame) => {
                      gameMap.mapFrames.get(markedMapFrame)?.SetIsMarked(false);
                    })
                    markedPossibleCastles.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarkedForCastle(false);
                    })

                    setSelectedItem("");
                    setMarkedItems([]);
                    setMarkedPossibleCastles([]);
                    setHoveredItem(null);
                    setGameMap(gameMap);
                  }
                }}
                className={`frame relative flex justify-center items-center text-xl w-10 md:w-20 h-10 md:h-20 transition-all
                  ${item.isSelected ? "bg-sky-600 selected-frame" :
                  item.isThreatened ? `bg-red-600 checked-frame` :
                  item.color === "black" && (item.isMarked || item.isMarkedForCastle) ? `${item.piece ? "bg-chess-black-blue-2 hover:bg-sky-500" : "hover:bg-chess-black-blue"} bg-chess-black` :
                    item.color === "white" && (item.isMarked || item.isMarkedForCastle) ? `${item.piece ? "bg-chess-white-blue-2 hover:bg-sky-500" : "hover:bg-chess-white-blue"} bg-chess-white` :
                      item.color === "black" ? "bg-chess-black" : "bg-chess-white"
                  } ${item.positionName === hoveredItem ? "cursor-pointer" : null}`}
                key={item.positionName}>
                {
                  colPlaceForCoordinate(item, flipBoard) ?
                  <h1
                  className={`absolute z-0 md:m-1 text-xs md:text-sm font-semibold select-none bottom-0 left-0 w-5 md:w-10 ${item.color === "black" ? "text-chess-white" : "text-chess-black"}`}>
                    {colPlaceForCoordinate(item, flipBoard)}
                  </h1> : null
                }
                {
                  rowPlaceForCoordinate(item, flipBoard) ?
                  <h1
                  className={`absolute z-0 md:m-1 text-xs md:text-sm font-semibold select-none top-0 right-0 w-5 md:w-10 text-right ${item.color === "black" ? "text-chess-white" : "text-chess-black"}`}>
                    {rowPlaceForCoordinate(item, flipBoard)}
                  </h1> : null
                }
                {item.piece ?
                  <img className='select-none z-10 transition-all' src={item.piece.image} alt="" width={70} /> : item.isMarked && hoveredItem !== item.positionName ?
                    <TbPointFilled
                   size={55} className="text-cyan-500" />
                  : null
                }
              </article>
            ))
        }
      </section>
      {chessGame.gameMode === "1v1" ?
        <h1 className="text-center text-white text-2xl">
          {chessGame.turn === "black" ? 
          <span className='text-slate-500 font-bold'>BLACK</span> : 
          <span className='text-slate-100 font-bold'>WHITE</span>} turn
          </h1>
        :
        null
      }
      <button
      onClick={() => {
        setFlipBoard(!flipBoard);
      }} 
      className="bg-teal-600 px-5 rounded-2xl mt-2 font-bold text-white text-lg text-center block m-auto">
        Flip Board
      </button>
      <button
      onClick={() => {
        setAutoFlipBoard(!autoFlipBoard);
      }} 
      className="bg-teal-600 px-5 rounded-2xl mt-2 font-bold text-white text-lg text-center block m-auto">
        {autoFlipBoard ? "Disable auto Flip Board" : "Enable auto Flip Board"}
      </button>

    </div>
  )
}

export default GameMapComponent