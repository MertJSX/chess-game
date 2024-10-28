import React, { useState} from 'react'
import GameMapComponent from './GameMapComponent/GameMapComponent'
import { GameMap } from './classes/GameMap';
import MapFrame from './classes/MapFrame';

const GameComponent = () => {
  const [map, setMap] = useState<GameMap>(new GameMap());
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [markedItems, setMarkedItems] = useState<string[]>([]);

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