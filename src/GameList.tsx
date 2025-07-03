import React, { useState } from "react";
import ListItem from "./ListItem";
import "./GameList.css";
import grid from "./assets/icons/grid.svg";
import col from "./assets/icons/col.svg";
import dendy from "./assets/Dendy.png";
import useGames from "./services/useGames";
import { Game } from "./types";

interface GameListProps {
  filterCriteria: FilterCriteria;
}

interface FilterCriteria {
  platform: string;
  supportsMultiplayer: boolean;
  languageSupport: boolean;
}

const GameList: React.FC<GameListProps> = ({ filterCriteria }) => {
  const [displayMode, setDisplayMode] = useState("grid");
  const [sortBy, setSortBy] = useState<string>("");
  const [orderSelected, setOrderSelected] = useState("grid");

  const games = useGames(filterCriteria, sortBy);

  const handleOrderSelection = (selectionMode: string) => {
    setOrderSelected(selectionMode);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="w-full flex flex-col -mt-1">
      <h1 className="font-semibold mb-4 text-sm text-center text-zinc-600">
        What I'mma gonna play next week . . .
      </h1>
      <div className="ordering flex justify-between mb-2">
        <select
          name="sortBy"
          id="sortBy"
          onChange={handleSortChange}
          className="bg-zinc-800 px-2 py-1 rounded-md"
        >
          <option value="name">by name</option>
          <option value="rating">by rating</option>
        </select>
        <div className="display-order-menu flex gap-1">
          <button
            onClick={() => {
              setDisplayMode("column");
              handleOrderSelection("column");
            }}
            className={`w-8 hover:opacity-60 ${
              displayMode === "grid" ? "opacity-10" : ""
            }`}
          >
            <img src={col} />
          </button>
          <button
            onClick={() => {
              setDisplayMode("grid");
              handleOrderSelection("grid");
            }}
            className={`w-8 hover:opacity-60 outline-none ${
              displayMode === "column" ? "opacity-10" : ""
            }`}
          >
            <img src={grid} />
          </button>
        </div>
      </div>
      <ul
        className={`${
          displayMode === "column"
            ? "column-card-container"
            : "grid-card-container"
        }`}
      >
        {games.map((game: Game) => (
          <ListItem key={game.id} game={game} displayMode={displayMode} />
        ))}
      </ul>
      {orderSelected === "column" && (
        <img src={dendy} alt="" className=" fixed w-80 top-64 right-0 -z-20" />
      )}
    </div>
  );
};

export default GameList;
