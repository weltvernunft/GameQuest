import React, { useState, useEffect, ChangeEvent } from "react";
import { fetchPlatforms, Platform } from "./services/fetchPlatforms";

interface Props {
  onFilterChange: (
    platform: string,
    supportsMultiplayer: boolean,
    languageSupport: boolean
  ) => void;
  onSearchChange: (searchTerm: string) => void;
}

const Filtering: React.FC<Props> = ({ onFilterChange, onSearchChange }) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [supportsMultiplayer, setSupportsMultiplayer] =
    useState<boolean>(false);
  const [languageSupport, setLanguageSupport] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadPlatforms = async () => {
      const results = await fetchPlatforms();
      setPlatforms(results);
    };

    loadPlatforms();
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  return (
    <div className="filter-container w-80">
      <div className="flex flex-col gap-4 filter-options px-2 py-2 fixed border text-zinc-400 bg-zinc-800 border-zinc-700 h-[88vh] rounded-md">
        <label htmlFor="search">Search by name:</label>
        <input
          id="search"
          type="text"
          placeholder="e.g. Portal"
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-zinc-900 p-2 text-zinc-400 rounded-md"
        />

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
