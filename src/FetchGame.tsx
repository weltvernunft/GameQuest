// src/services/FetchGame.tsx

import axios from "axios";
import { Game } from "./types";

const API_URL = "https://api.rawg.io/api/games";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

interface FetchParams {
  platform?: string;
  supportsMultiplayer?: boolean;
  languageSupport?: boolean;
  searchTerm?: string;
}

export const fetchGames = async ({
  platform,
  supportsMultiplayer,
  languageSupport,
  searchTerm,
}: FetchParams): Promise<Game[]> => {
  try {
    const params: any = {
      key: API_KEY,
      page_size: 20,
    };

    if (platform) params.platforms = platform;
    if (searchTerm) params.search = searchTerm;

    // Пример фильтрации: RAWG не даёт фильтр по мультиплееру напрямую
    if (supportsMultiplayer) {
      params.tags = "multiplayer";
    }

    const response = await axios.get(API_URL, { params });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
