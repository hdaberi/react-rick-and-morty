import Navbar, { SearchResult } from "./components/Navbar";
import CharacterDetail from "./components/CharacterDetil";
import CharacterLists from "./components/CharacterLists";
import { character } from "../data/data.js";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./App.css";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character",
        );
        setAllCharacters(data.results.slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error, {
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
