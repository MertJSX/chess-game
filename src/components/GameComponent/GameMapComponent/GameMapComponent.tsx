import React, { useRef } from 'react';
import { GameMap } from '../classes/GameMap';
import MapFrame from '../classes/MapFrame';
import { CalculateChessMoves } from '../classes/CalculateChessMoves';
import { ChessMoveProvider } from '../classes/ChessMoveProvider';

interface GameMapProps {
  gameMap: GameMap,
  setGameMap: React.Dispatch<React.SetStateAction<GameMap>>,
  selectedItem: string,
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>,
  markedItems: string[],
  setMarkedItems: React.Dispatch<string[]>
}

const GameMapComponent: React.FC<GameMapProps> = ({ gameMap, setGameMap, selectedItem, setSelectedItem, markedItems, setMarkedItems }) => {
  const arrayFromGameMap = Array.from(gameMap.mapFrames.values());
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
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  if (item.isMarked) {
                    gameMap.changePosition(selectedItem, item.positionName);

                    gameMap.mapFrames.get(selectedItem)?.SetSelected(false);
                    markedItems.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarked(false);
                    })

                    setSelectedItem("");
                    setMarkedItems([]);
                    setGameMap(gameMap);
                  }
                  else if (!item.isSelected && item.piece) {
                    gameMap.mapFrames.get(selectedItem)?.SetSelected(false);
                    markedItems.forEach((markedFrameID) => {
                      gameMap.mapFrames.get(markedFrameID)?.SetIsMarked(false);
                    })

                    gameMap.mapFrames.get(item.positionName)?.SetSelected(true);
                    setSelectedItem(item.positionName);

                    ChessMoveProvider.Provide(gameMap, item, markedItems, setMarkedItems)

                    setGameMap(gameMap);
                  } else if (selectedItem !== null && item.isMarked === false) {
                    gameMap.mapFrames.get(selectedItem)?.SetSelected(false);
                    markedItems.forEach((markedMapFrame) => {
                      gameMap.mapFrames.get(markedMapFrame)?.SetIsMarked(false);
                    })

                    setSelectedItem("");
                    setMarkedItems([]);
                    setGameMap(gameMap);
                  }

                  if (gameMap.isThreatenedPosition("e1", "white")) {
                    console.log("DO SOMETHING WHITE KING IS UNDER ATTACK!");
                    
                  }
                  if (gameMap.isThreatenedPosition("e8", "black")) {
                    console.log("DO SOMETHING BLACK KING IS UNDER ATTACK!");
                  }
                }}
                className={`flex justify-center items-center text-xl w-20 h-20 ${item.isSelected ? "bg-sky-600" :
                  item.color === "black" && item.isMarked ? "bg-chess-black-green" :
                    item.color === "white" && item.isMarked ? "bg-chess-white-green" :
                      item.color === "black" ? "bg-chess-black" : "bg-chess-white"
                  }`}
                key={item.positionName}>
                {item.piece ?
                  <img className='select-none' src={item.piece.image} alt="" width={70} /> : null
                }
              </div>
            ))
        }
      </div>

    </div>
  )
}

export default GameMapComponent