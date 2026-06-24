import Navbar, { SearchResult } from "./components/Navbar";
import CharacterDetail from "./components/CharacterDetil";
import CharacterLists from "./components/CharacterLists";
import { character } from "../data/data.js";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setAllCharacters(data.results.slice(0, 5));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar>
        <SearchResult numOfResult={allCharacters.length} />
      </Navbar>
      <Main>
        <CharacterLists allCharacters={allCharacters} isLoading={isLoading} />
        <CharacterDetail character={character} />
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
