// types.ts
export interface ApiGame {
  id: number;
  name: string;
  rating: number;
  rating_top: number;
  tags?: { name: string }[];
}

export interface Game extends ApiGame {
  background_image: string;
  languageSupport: boolean;
  screenshots: { image: string }[];
  supportsMultiplayer: boolean;
  playtime: string;
  released: string;
  platforms: {
    platform: {
      slug: string;
      name: string;
    };
  }[];
}
