import Navbar from "./components/Navbar";
import CharacterDetail from "./components/CharacterDetil";
import CharacterLists from "./components/CharacterLists";
import { allCharacters, character } from "../data/data.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <CharacterLists allCharacters={allCharacters} />
        <CharacterDetail character={character} />
      </div>
    </div>
  );
}
export default App;
