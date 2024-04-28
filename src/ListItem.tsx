import React, { useState, useEffect } from "react";
import star from "./assets/icons/Star.svg";
import pc from "./assets/icons/platforms/pc.svg";
import android from "./assets/icons/platforms/android.svg";
import playstation from "./assets/icons/platforms/playstation.svg";
import ios from "./assets/icons/platforms/ios.svg";
import xbox from "./assets/icons/platforms/xbox.svg";

interface ListItemProps {
  game: {
    id: number;
    name: string;
    rating: number;
    background_image: string;
    languageSupport: boolean;
    screenshots: any[];
    supportsMultiplayer: boolean;
    playtime: string;
    released: string;
    platforms: any[];
  };
  displayMode: string;
}

const ListItem: React.FC<ListItemProps> = ({ game, displayMode }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] =
    useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const containerWidth = e.currentTarget.offsetWidth;
    const xPosition = e.nativeEvent.offsetX;
    const numberOfScreenshots = game.screenshots.length;
    const newIndex = Math.floor(
      (xPosition / containerWidth) * numberOfScreenshots
    );
    setCurrentScreenshotIndex(newIndex);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentScreenshotIndex(0);
  };

  const icons = ["pc", "android", "playstation", "ios", "xbox"];
  const platformIcons = {
    pc: pc,
    android: android,
    playstation: playstation,
    ios: ios,
    xbox: xbox,
  };

  const platformNames = game.platforms.map((platform) => {
    const platformSlug = platform.platform.slug.toLowerCase();
    for (const icon of icons) {
      if (platformSlug.includes(icon)) {
        return icon;
      }
    }
  });
  const uniquePlatformNames = [...new Set(platformNames)];
  console.log(`${game.name} unique platforms: ${uniquePlatformNames}`);

  return (
    <li
      className={`relative flex flex-col gap-0 text-sm bg-zinc-800 rounded-md overflow-hidden ${
        displayMode === "column" ? "card-column" : "grid-card-container"
      }`}
    >
      <div
        className={`img-container w-full ${
          displayMode === "column" ? "h-80" : "h-56"
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {game.screenshots.length > 0 && isHovering ? (
          <img
            src={game.screenshots[currentScreenshotIndex]?.image}
            alt={game.name}
            className="w-full transition-all h-3/4 hover:h-full object-cover"
          />
        ) : (
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full transition-all h-3/4 hover:h-full object-cover"
          />
        )}
        {isHovering && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 mt-2">
            {game.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full cursor-pointer ${
                  index === currentScreenshotIndex
                    ? "bg-gray-500"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentScreenshotIndex(index)}
              ></div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full px-5 py-4 text-left text-gray-300 | flex flex-col gap-1 min-h-32">
        <div className="platforms flex gap-2">
          {uniquePlatformNames.map((platform, index) =>
            platformIcons[platform] ? (
              <img
                src={platformIcons[platform]}
                alt={platform}
                key={index}
                className="w-4"
              />
            ) : null
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
        <div className="main-info flex justify-between">
          <div className="stars flex m-0 p-0">
            {Array.from({ length: Math.floor(game.rating) }).map((_, index) => (
              <img
                key={index}
                src={star}
                alt="Star"
                className="w-3 inline-block mr-1"
              />
            ))}
            <p className="ml-1 text-zinc-500">{game.rating}</p>
          </div>
          <div className="release-date text-zinc-500">
            released:{" "}
            <span className="text-zinc-300">
              {game.released.replace(/-/g, ".")}
            </span>
          </div>
        </div>
        <div className="multiplayer flex justify-between">
          <div className="tags flex gap-1">
            {game.supportsMultiplayer && (
              <span className="py-1 px-2 bg-zinc-700 text-xs rounded-sm inline-block w-24d">
                Multiplayer
              </span>
            )}
            {game.languageSupport && (
              <span className="py-1 px-2 bg-zinc-700 text-xs rounded-sm inline-block w-24d">
                RU
              </span>
            )}
          </div>
          {game.supportsMultiplayer && (
            <p className="text-zinc-500">
              Max players: <span className="text-global text-zinc-300">{game.playtime}</span>
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default ListItem;
