import React, { useState, useEffect, ChangeEvent } from "react";

interface Props {
 onFilterChange: (platform: string, supportsMultiplayer: boolean, languageSupport: boolean) => void;
}

const Filtering: React.FC<Props> = ({ onFilterChange }) => {
 const [platforms, setPlatforms] = useState<{ id: number; name: string }[]>([]);
 const [selectedPlatform, setSelectedPlatform] = useState<string>("");
 const [supportsMultiplayer, setSupportsMultiplayer] = useState<boolean>(false);
 const [languageSupport, setLanguageSupport] = useState<boolean>(false); // New state for language support

 useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(
          "https://api.rawg.io/api/platforms?key=77d7bda14f2f481787bdd0b0a148ef92"
        );
        const data = await response.json();
        setPlatforms(data.results);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
 }, []);

 const handlePlatformChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPlatformId = e.target.value;
    setSelectedPlatform(selectedPlatformId);
    onFilterChange(selectedPlatformId, supportsMultiplayer, languageSupport);
 };

 const handleMultiplayerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSupportsMultiplayer = e.target.checked;
    setSupportsMultiplayer(newSupportsMultiplayer);
    onFilterChange(selectedPlatform, newSupportsMultiplayer, languageSupport);
 };

 const handleLanguageSupportChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newLanguageSupport = e.target.checked;
    setLanguageSupport(newLanguageSupport);
    onFilterChange(selectedPlatform, supportsMultiplayer, newLanguageSupport);
 };

 return (
    <div className="filter-container w-80">
      <div className="flex flex-col gap-4 filter-options px-2 py-2 fixed border text-zinc-400 bg-zinc-800 border-zinc-700 h-[95vh] rounded-md">
        <label htmlFor="platformFilter">Filter by platform:</label>
        <select
          id="platformFilter"
          value={selectedPlatform}
          onChange={handlePlatformChange}
          className="bg-zinc-900 p-2 text-zinc-400 rounded-md"
        >
          <option value="">All Platforms</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id.toString()}>
              {platform.name}
            </option>
          ))}
        </select>
        <div className="mt-4 flex justify-between">
          <label htmlFor="multiplayerFilter">Supports Multiplayer:</label>
          <input
            type="checkbox"
            id="multiplayerFilter"
            checked={supportsMultiplayer}
            onChange={handleMultiplayerChange}
            className="ml-2"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <label htmlFor="languageSupportFilter">Supports Russian:</label>
          <input
            type="checkbox"
            id="languageSupportFilter"
            checked={languageSupport}
            onChange={handleLanguageSupportChange}
            className="ml-2"
          />
        </div>
      </div>
    </div>
 );
};

export default Filtering;
