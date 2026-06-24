import Navbar, { SearchResult } from "./components/Navbar";
import CharacterDetail from "./components/CharacterDetil";
import CharacterLists from "./components/CharacterLists";
import { character } from "../data/data.js";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://rickandmortyapi.com/api/character",
        );
        if (!response.ok) throw new Error("Something went wrong !");
        const data = await response.json();
        setAllCharacters(data.results.slice(0, 5));
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Toaster />
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
