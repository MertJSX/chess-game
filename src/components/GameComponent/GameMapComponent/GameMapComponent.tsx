import React, { useEffect, useRef } from 'react';
import { GameMap } from '../classes/GameMap';
import MapFrame from '../classes/MapFrame';

interface GameMapProps {
  gameMap: GameMap,
  setGameMap: React.Dispatch<React.SetStateAction<GameMap>>,
  selectedItem: string,
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}

const GameMapComponent: React.FC<GameMapProps> = ({ gameMap, setGameMap, selectedItem, setSelectedItem }) => {
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
                    setGameMap(gameMap);
                  }
                }}
                className={`flex justify-center items-center text-xl w-20 h-20 ${item.isSelected ? "bg-sky-600" : item.color === "black" ? "bg-stone-700" : "bg-gray-500"}`}
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