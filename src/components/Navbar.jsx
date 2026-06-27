import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO</div>

      {children}
    </nav>
  );
}

export default Navbar;

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} Characters</div>;
}
export function SearchInput({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="Search..."
    />
  );
}
export function Favourite({ favouritesLength }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{favouritesLength}</span>
    </button>
  );
}
