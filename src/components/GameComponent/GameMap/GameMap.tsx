import React from 'react';
import { Map } from '../classes/Map';

interface GameMapProps {
  gameMap: Map
}

const GameMap : React.FC<GameMapProps> = ({gameMap}) => {
  return (
    <div>
      <h1>Game Map</h1>
      <div className="flex flex-wrap w-[644px] m-auto border-2 border-black">
        {
        gameMap.map
        .map((item, key) => (
          <div className={`text-xl w-20 h-20 ${item.color === "black" ? "bg-gray-900" : "bg-gray-500"}`} key={key}>
            <h1 className={`${item.color === "black" ? "text-gray-500" : "text-gray-900"}`}>{item.positionName}{item.position.col === 8 ? <br/> : null}</h1>
            <br />
          </div>
        ))
      }
      </div>
      
    </div>
  )
}

export default GameMap