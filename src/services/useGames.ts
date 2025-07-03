import { useEffect, useState } from "react";
import { Game } from "../types";

const API_KEY = "77d7bda14f2f481787bdd0b0a148ef92";
const DEFAULT_LANGUAGE = "Russian";

interface FilterCriteria {
  platform: string;
  supportsMultiplayer: boolean;
  languageSupport: boolean;
}

const useGames = (filterCriteria: FilterCriteria, sortBy: string) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let url = `https://api.rawg.io/api/games?key=${API_KEY}`;

        if (filterCriteria.platform) {
          url += `&platforms=${filterCriteria.platform}`;
        }

        if (filterCriteria.supportsMultiplayer) {
          url += `&tags=multiplayer`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const gamesWithScreenshots = await Promise.all(
          data.results.map(async (game: Game) => {
            const supportsMultiplayer =
              game.tags?.some((tag) => tag.name === "Multiplayer") ?? false;

            const screenshotsResponse = await fetch(
              `https://api.rawg.io/api/games/${game.id}/screenshots?key=${API_KEY}`
            );
            const screenshotsData = await screenshotsResponse.json();

            return {
              ...game,
              supportsMultiplayer,
              screenshots: screenshotsData.results,
              languageSupport:
                game.rating_top === 5 ? DEFAULT_LANGUAGE : undefined,
            };
          })
        );

        let sortedGames = [...gamesWithScreenshots];

        if (sortBy === "rating") {
          sortedGames.sort((a, b) => b.rating - a.rating);
        }

        if (sortBy === "name") {
          sortedGames.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (filterCriteria.languageSupport) {
          sortedGames = sortedGames.filter(
            (game) => game.languageSupport === DEFAULT_LANGUAGE
          );
        }

        setGames(sortedGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [filterCriteria, sortBy]);

  return games;
};

export default useGames;
