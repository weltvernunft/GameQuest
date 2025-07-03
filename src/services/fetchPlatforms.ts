// src/services/fetchPlatforms.ts

export interface Platform {
  id: number;
  name: string;
}

export const fetchPlatforms = async (): Promise<Platform[]> => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return [];
  }
};
