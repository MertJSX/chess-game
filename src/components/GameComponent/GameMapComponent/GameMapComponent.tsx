import React, { useRef } from 'react';
import { GameMap } from '../classes/GameMap';
import { TbPointFilled } from "react-icons/tb";
import { ChessMoveProvider } from '../classes/ChessMoveProvider';
import { colPlaceForCoordinate, rowPlaceForCoordinate } from '../utils/placeForCoordinate';

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
  const arrayFromGameMap = Array.from(gameMap.mapFrames.values());
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const mapElements = useRef(null)

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
                  setHoveredItem(item.positionName);
                }}
                onMouseLeave={() => {
                  setHoveredItem(null);
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

                  if (gameMap.isThreatenedPosition("e1", "white")) {
                    console.log("DO SOMETHING WHITE KING IS UNDER ATTACK!");
                    
                  }
                  if (gameMap.isThreatenedPosition("e8", "black")) {
                    console.log("DO SOMETHING BLACK KING IS UNDER ATTACK!");
                  }
                }}
                className={`relative flex justify-center items-center text-xl w-20 h-20 ${item.isSelected ? "bg-sky-600" :
                  item.color === "black" && (item.isMarked || item.isMarkedForCastle) ? `${item.piece ? "bg-chess-black-blue-2" : "hover:bg-chess-black-blue"} bg-chess-black` :
                    item.color === "white" && (item.isMarked || item.isMarkedForCastle) ? `${item.piece ? "bg-chess-white-blue-2" : "hover:bg-chess-white-blue"} bg-chess-white` :
                      item.color === "black" ? "bg-chess-black" : "bg-chess-white"
                  }`}
                key={item.positionName}>
                {
                  colPlaceForCoordinate(item) ?
                  <h1
                  className={`absolute m-1 text-sm font-semibold bottom-0 left-0 w-10 ${item.color === "black" ? "text-chess-white" : "text-chess-black"}`}>
                    {colPlaceForCoordinate(item).toString()}
                  </h1> : null
                }
                {
                  rowPlaceForCoordinate(item) ?
                  <h1
                  className={`absolute m-1 text-sm font-semibold top-0 right-0 w-10 text-right ${item.color === "black" ? "text-chess-white" : "text-chess-black"}`}>
                    {rowPlaceForCoordinate(item).toString()}
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

    </div>
  )
}

export default GameMapComponent