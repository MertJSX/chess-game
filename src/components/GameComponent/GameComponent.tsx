import React, { useEffect, useState } from "react";
import GameMapComponent from "./GameMapComponent/GameMapComponent";
import { GameMap } from "./classes/GameMap";
import { ChessGame } from "./classes/ChessGame";

const GameComponent = () => {
  const [map, setMap] = useState<GameMap>(new GameMap());
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [markedItems, setMarkedItems] = useState<string[]>([]);
  const [markedPossibleCastles, setMarkedPossibleCastles] = useState<string[]>(
    []
  );
  const [sandboxGame, setSandboxGame] = useState<ChessGame>(
    new ChessGame(map, "sandbox")
  );

  useEffect(() => {
    let sandboxGameUpdate: ChessGame = sandboxGame;
    sandboxGameUpdate.setGameMap(map);
    setSandboxGame(sandboxGameUpdate);
  }, [map]);

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
        chessGame={sandboxGame}
        setChessGame={setSandboxGame}
      />
    </div>
  );
};

export default GameComponent;
