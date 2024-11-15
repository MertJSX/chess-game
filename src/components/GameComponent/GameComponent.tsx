import React, { useState} from 'react'
import GameMapComponent from './GameMapComponent/GameMapComponent'
import { GameMap } from './classes/GameMap';

const GameComponent = () => {
  const [map, setMap] = useState<GameMap>(new GameMap());
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [markedItems, setMarkedItems] = useState<string[]>([]);
  const [markedPossibleCastles, setMarkedPossibleCastles] = useState<string[]>([]);

  return (
    <div>
      <GameMapComponent 
      gameMap={map} 
      setGameMap={setMap} 
      selectedItem={selectedItem} 
      setSelectedItem={setSelectedItem}
      markedItems={markedItems}
      setMarkedItems={setMarkedItems}
      markedPossibleCastles={markedPossibleCastles}
      setMarkedPossibleCastles={setMarkedPossibleCastles}
       />
    </div>
  )
}

export default GameComponent