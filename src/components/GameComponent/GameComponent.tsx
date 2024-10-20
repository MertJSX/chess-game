import React, { useState, useEffect } from 'react'
import GameMap from './GameMap/GameMap'
import { Map } from './classes/Map';

const GameComponent = () => {
  const [map, setMap] = useState(new Map());
  useEffect(() => {
    console.log(map);
  },[])

  return (
    <div>
      <GameMap gameMap={map} />
    </div>
  )
}

export default GameComponent