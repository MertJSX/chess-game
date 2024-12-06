import React from 'react'
import GameComponent from '../../components/GameComponent/GameComponent'

const Game = () => {
  return (
    <div>
      <h1 className="text-center text-white text-5xl font-bold select-none mt-5">
        CHESS GAME
      </h1>
      <h1 className="text-center text-teal-200 text-xl m-2 italic select-none mt-0">
        By MertJS
      </h1>
      <GameComponent />
    </div>
  )
}

export default Game