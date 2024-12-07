import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-white text-5xl md:text-8xl font-bold select-none mt-32">
        CHESS GAME
      </h1>
      <h1 className="text-center text-teal-200 text-xl m-2 italic select-none mt-0">
        By MertJS
      </h1>
      <div className="block md:mt-14">
        <h1 className="text-center text-white text-xl m-2">Select game mode</h1>
        <div className="gap-4">
          <Link
            to="/game?gamemode=sandbox"
            className="w-3/4 md:w-1/3 bg-teal-600 hover:bg-teal-700 rounded-full font-bold text-white px-4 text-center block m-auto text-lg mt-2 mb-2"
          >
            Sandbox
          </Link>
          <Link
            to="/game"
            className="w-3/4 md:w-1/3 bg-teal-600 hover:bg-teal-700 rounded-full font-bold text-white px-4 text-center block m-auto text-lg mt-2 mb-2"
          >
            Play with a Friend
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
