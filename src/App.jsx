import Navbar, {
  SearchResult,
  SearchInput,
  Favourite,
} from "./components/Navbar";
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
  const [favourites, setFavourites] = useState(()=> {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          {
            signal: controller.signal,
          },
        );
        setAllCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (!axios.isCancel(error)) {
          toast.error(error.response.data.error, {
            position: "top-right",
          });
        } else {
          console.log("successfully aborted");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [query]);

  const handleCharacterId = (id) => {
    setSelectId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourit = (char) => {
    setFavourites((prevFav) => {
      return [...prevFav, char];
    });
  };

  const handleRemoveFavourit = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isFavourite = favourites.map((fav) => fav.id).includes(selectId);

  return (
    <div className="App">
      <Toaster />

      <Navbar>
        <SearchInput query={query} setQuery={setQuery} />
        <SearchResult numOfResult={allCharacters.length} />
        <Favourite
          favourites={favourites}
          onRemoveFavourit={handleRemoveFavourit}
        />
      </Navbar>
      <Main>
        <CharacterLists
          allCharacters={allCharacters}
          isLoading={isLoading}
          onSelectId={handleCharacterId}
          selectId={selectId}
        ></CharacterLists>
        <CharacterDetail
          selectId={selectId}
          onAddFavourit={handleAddFavourit}
          isFavourite={isFavourite}
          onRemoveFavourit={handleRemoveFavourit}
        />
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
