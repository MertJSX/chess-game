import React, { useState, useEffect } from 'react'
import GameMapComponent from './GameMapComponent/GameMapComponent'
import { GameMap } from './classes/GameMap';
import MapFrame from './classes/MapFrame';

const GameComponent = () => {
  const [map, setMap] = useState<GameMap>(new GameMap());
  const [selectedItem, setSelectedItem] = useState("");
  useEffect(() => {
    console.log(map);
  },[map])

  return (
    <div>
      <GameMapComponent gameMap={map} setGameMap={setMap} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    </div>
  )
}

export default GameComponent