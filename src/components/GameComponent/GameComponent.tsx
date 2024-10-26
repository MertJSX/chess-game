import React, { useState, useEffect } from 'react'
import GameMapComponent from './GameMapComponent/GameMapComponent'
import { GameMap } from './classes/GameMap';
import MapFrame from './classes/MapFrame';

const GameComponent = () => {
  const [map, setMap] = useState<GameMap>(new GameMap());
  const [selectedItem, setSelectedItem] = useState("");
  const [markedItems, setMarkedItems] = useState<string[]>([]);
  useEffect(() => {
    console.log(map);
  },[map])

  return (
    <div>
      <GameMapComponent 
      gameMap={map} 
      setGameMap={setMap} 
      selectedItem={selectedItem} 
      setSelectedItem={setSelectedItem}
      markedItems={markedItems}
      setMarkedItems={setMarkedItems}
       />
    </div>
  )
}

export default GameComponent