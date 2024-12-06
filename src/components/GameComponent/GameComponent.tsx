import React, { useEffect, useState } from "react";
import GameMapComponent from "./GameMapComponent/GameMapComponent";
import { GameMap } from "./classes/GameMap";
import { ChessGame } from "./classes/ChessGame";
import { useLocation } from "react-router-dom";

const GameComponent = () => {
  const [map, setMap] = useState<GameMap>(new GameMap());
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [markedItems, setMarkedItems] = useState<string[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gamemode = queryParams.get("gamemode") as "sandbox" | "1v1" | null;
  const [markedPossibleCastles, setMarkedPossibleCastles] = useState<string[]>(
    []
  );
  const [ChessGameObj, setChessGameObj] = useState<ChessGame>(
    new ChessGame(map, gamemode ?? "1v1")
  );

  useEffect(() => {
    let sandboxGameUpdate: ChessGame = ChessGameObj;
    sandboxGameUpdate.setGameMap(map);
    setChessGameObj(sandboxGameUpdate);
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
        chessGame={ChessGameObj}
        setChessGame={setChessGameObj}
      />
    </div>
  );
};

export default GameComponent;
