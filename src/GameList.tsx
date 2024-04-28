import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import "./GameList.css";
import grid from "./assets/icons/grid.svg";
import col from "./assets/icons/col.svg";
import dendy from "./assets/Dendy.png";

interface GameListProps {
  filterCriteria: FilterCriteria;
}

interface FilterCriteria {
  platform: string;
  supportsMultiplayer: boolean;
  languageSupport: boolean;
}

const API_KEY = "77d7bda14f2f481787bdd0b0a148ef92";

const GameList: React.FC<GameListProps> = ({ filterCriteria }) => {
  const [games, setGames] = useState<any[]>([]);
  const [displayMode, setDisplayMode] = useState("grid");
  const [sortBy, setSortBy] = useState<string>("");
  const [orderSelected, setOrderSelected] = useState("grid");
  const handleOrderSelection = (selectionMode: string) => {
    setOrderSelected(selectionMode);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log(
          `supportsMultiplayer: ${filterCriteria.supportsMultiplayer}\n`
        );
        console.log(`platform: ${filterCriteria.platform}\n`);
        let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
        if (filterCriteria.platform) {
          url += `&platforms=${filterCriteria.platform}`;
          console.log(url);
        }
        if (filterCriteria.supportsMultiplayer) {
          url += `&tags=multiplayer`;
          console.log(url);
        }
        const response = await fetch(url);
        const data = await response.json();
        const gamesWithScreenshots = await Promise.all(
          data.results.map(async (game: any) => {
            const supportsMultiplayer = game.tags.some(
              (tag) => tag.name === "Multiplayer"
            );
            game.supportsMultiplayer = supportsMultiplayer;
            const screenshotsResponse = await fetch(
              `https://api.rawg.io/api/games/${game.id}/screenshots?key=${API_KEY}`
            );
            const screenshotsData = await screenshotsResponse.json();
            game.screenshots = screenshotsData.results;
            return game;
          })
        );

        const languages = ["Russian"];

        gamesWithScreenshots.forEach((game, index) => {
          if (game.rating_top === 5) {
            game.languageSupport = languages[0];
          }
        });

        let sortedGames = [...gamesWithScreenshots];

        if (sortBy === "rating") {
          sortedGames.sort((a, b) => b.rating - a.rating);
        }

        if (sortBy === "name") {
          sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (filterCriteria.languageSupport) {
          sortedGames = sortedGames.filter(
            (game) => game.languageSupport === "Russian"
          );
        }

        setGames(sortedGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [filterCriteria, sortBy]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="w-full flex flex-col -mt-1 ">
      <h1 className="font-semibold mb-4 text-sm text-center text-zinc-600">What I'mma gonna play next week . . .</h1>
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
        {games.map((game: any) => (
          <ListItem
            key={game.id}
            game={game}
            displayMode={displayMode}
            supportsMultiplayer={game.supportsMultiplayer}
          />
        ))}
      </ul>
      {orderSelected === "column" && (
        <img src={dendy} alt="" className=" fixed w-80 top-64 right-0 -z-20" />
      )}
    </div>
  );
};

export default GameList;
