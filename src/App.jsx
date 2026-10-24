import Navbar, {
  NavbarFavourite,
  NavbarSearch,
  SearchResult,
} from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";

import "./App.css";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import useCharachters from "./hooks/useCharachters";
import useLocalstorage from "./hooks/useLocalstorage";

function App() {
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState(null);

  const { characters, isLoading } = useCharachters(query);
  const { favourite, setFavourite } = useLocalstorage();

  const handleSelectId = (id) => {
    setSelectId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char) => {
    setFavourite((prevFav) => [...prevFav, char]);
  };

  const handleRemoveFavourite = (char) => {
    setFavourite((prevFav) => prevFav.filter((fav) => fav.id !== char.id));
  };
  const isAddFavourite = favourite.map((fav) => fav.id).includes(selectId);



  return (
    <div className="app">
      <Toaster />

      <Navbar>
        <NavbarSearch query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <NavbarFavourite
          navbarFavouriteItem={favourite}
          onRemoveFavourit={handleRemoveFavourite}
        />
      </Navbar>
      <Main>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectedId={handleSelectId}
          selectId={selectId}
        />

        <CharacterDetail
          selectId={selectId}
          onAddFavourit={handleAddFavourite}
          isAddFavourite={isAddFavourite}
          onRemoveFavourit={handleRemoveFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
