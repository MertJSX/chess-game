import React, { useEffect, useRef, useState } from 'react';
import { GameMap } from '../classes/GameMap';
import { TbPointFilled } from "react-icons/tb";
import { ChessMoveProvider } from '../classes/ChessMoveProvider';
import { colPlaceForCoordinate, rowPlaceForCoordinate } from '../utils/placeForCoordinate';
import MapFrame from '../classes/MapFrame';

interface GameMapProps {
  gameMap: GameMap,
  setGameMap: React.Dispatch<React.SetStateAction<GameMap>>,
  selectedItem: string,
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>,
  markedItems: string[],
  setMarkedItems: React.Dispatch<string[]>,
  markedPossibleCastles: string[],
  setMarkedPossibleCastles: React.Dispatch<string[]>
}

const GameMapComponent: React.FC<GameMapProps> = ({ gameMap, setGameMap, selectedItem, setSelectedItem, markedItems, setMarkedItems, markedPossibleCastles, setMarkedPossibleCastles }) => {
  const [arrayFromGameMap, setArrayFromGameMap] = useState<Array<MapFrame>>(Array.from(gameMap.mapFrames.values()));
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [flipBoard, setFlipBoard] = React.useState<boolean>(false);
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
      <h1>Game Map</h1>
      <div
        ref={mapElements}
        className="flex flex-wrap w-[644px] m-auto border-2 border-black">
        {
          arrayFromGameMap
            .map((item) => (
              <div
                onMouseEnter={() => {
                  if (selectedItem !== "") {
                    setHoveredItem(item.positionName);
                  }
                }}
                onMouseLeave={() => {
                  if (selectedItem !== "") {
                    setHoveredItem(null);
                  }
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
                    setGameMap(gameMap);
                  }
                  else if (!item.isSelected && item.piece) {
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
                    setGameMap(gameMap);
                  }
                }}
                className={`relative flex justify-center items-center text-xl w-20 h-20 ${item.isSelected ? "bg-sky-600" :
                  item.isThreatened ? `bg-red-600` :
                  item.color === "black" && (item.isMarked || item.isMarkedForCastle) ? `${item.piece ? "bg-chess-black-blue-2 hover:bg-sky-500" : "hover:bg-chess-black-blue"} bg-chess-black` :
                    item.color === "white" && (item.isMarked || item.isMarkedForCastle) ? `${item.piece ? "bg-chess-white-blue-2 hover:bg-sky-500" : "hover:bg-chess-white-blue"} bg-chess-white` :
                      item.color === "black" ? "bg-chess-black" : "bg-chess-white"
                  }`}
                key={item.positionName}>
                {
                  colPlaceForCoordinate(item, flipBoard) ?
                  <h1
                  className={`absolute m-1 text-sm font-semibold select-none bottom-0 left-0 w-10 ${item.color === "black" ? "text-chess-white" : "text-chess-black"}`}>
                    {colPlaceForCoordinate(item, flipBoard)}
                  </h1> : null
                }
                {
                  rowPlaceForCoordinate(item, flipBoard) ?
                  <h1
                  className={`absolute m-1 text-sm font-semibold select-none top-0 right-0 w-10 text-right ${item.color === "black" ? "text-chess-white" : "text-chess-black"}`}>
                    {rowPlaceForCoordinate(item, flipBoard)}
                  </h1> : null
                }
                {item.piece ?
                  <img className='select-none ' src={item.piece.image} alt="" width={70} /> : item.isMarked && hoveredItem !== item.positionName ?
                    <TbPointFilled
                   size={55} className="text-cyan-500" />
                  : null
                }
              </div>
            ))
        }
      </div>
      <button
      onClick={() => {
        setFlipBoard(!flipBoard);
      }} 
      className="bg-teal-600 px-5 rounded-2xl mt-2 font-bold text-white text-lg text-center block m-auto">
        Flip Board
      </button>

    </div>
  )
}

export default GameMapComponent