import React, { useState } from "react";
import GameList from "./GameList";
import Filtering from "./Filtering";
import Nav from "./Nav";

const App: React.FC = () => {
  const [filterCriteria, setFilterCriteria] = useState({
    platform: "",
    supportsMultiplayer: false,
    languageSupport: false,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleFilterChange = (
    platform: string,
    supportsMultiplayer: boolean,
    languageSupport: boolean
  ) => {
    setFilterCriteria({ platform, supportsMultiplayer, languageSupport });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="">
      <Nav />
      <div className="main flex px-4 py-14">
        <Filtering
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
        <GameList filterCriteria={filterCriteria} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default App;
