import React, { useEffect, useRef } from 'react';
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
  useEffect(() => {
    console.log(gameMap.mapFrames.get(selectedItem));

  }, [selectedItem])
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
                  if (!item.isSelected && item.piece) {
                    if (selectedItem !== null) {
                      gameMap.mapFrames.get(selectedItem)?.SetSelected(false);
                    }
                    gameMap.mapFrames.get(item.positionName)?.SetSelected(true);
                    setSelectedItem(item.positionName);

                    ChessMoveProvider.Provide(gameMap, item, markedItems, setMarkedItems)

                    // if (item.piece.name === "Pawn") {
                    //   let selectedFrame = gameMap.mapFrames.get(item.positionName);
                    //   if (selectedFrame) {
                    //     let possibleMoves: Array<string> = CalculateChessMoves.Pawn(gameMap, selectedFrame);

                    //     if (markedItems[0] !== undefined) {
                    //       markedItems.forEach((markedItem) => {
                    //         gameMap.mapFrames.get(markedItem)?.SetIsMarked(false);
                    //       })
                    //     }

                    //     if (possibleMoves) {
                    //       possibleMoves.forEach((cordinate) => {
                    //         gameMap.mapFrames.get(cordinate)?.SetIsMarked(true);
                    //       })
                    //     }

                    //     console.log(possibleMoves);

                    //     setMarkedItems(possibleMoves)
                    //   }
                    // }
                    setGameMap(gameMap);
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