import Navbar, { SearchResult, SearchInput } from "./components/Navbar";
import CharacterDetail from "./components/CharacterDetil";
import CharacterLists from "./components/CharacterLists";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "./App.css";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
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
  }, [query]);

  const handleCharacterId = (id) => {
    setSelectId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="App">
      <Toaster />
      <Navbar>
        <SearchInput query={query} setQuery={setQuery} />
        <SearchResult numOfResult={allCharacters.length} />
      </Navbar>
      <Main>
        <CharacterLists
          allCharacters={allCharacters}
          isLoading={isLoading}
          onSelectId={handleCharacterId}
          selectId={selectId}
        />
        <CharacterDetail selectId={selectId} />
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
