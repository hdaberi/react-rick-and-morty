import { RocketLaunchIcon, TrashIcon } from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";
const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <NavbarLogo />
      {children}
    </nav>
  );
};

export default Navbar;

function NavbarLogo() {
  return (
    <div className="navbar__logo">
      ROCKET AI <RocketLaunchIcon className="icon" />
    </div>
  );
}
export function NavbarSearch({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="text-field"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function NavbarFavourite({ navbarFavouriteItem, onRemoveFavourit }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal title="this is modalww" open={isOpen} onOpen={setIsOpen}>
        {navbarFavouriteItem.map((item) => {
          return (
            <Character key={item.id} item={item}>
              <button onClick={() => onRemoveFavourit(item)}>
                <TrashIcon className="icon red" />
              </button>
            </Character>
          );
        })}
      </Modal>
      <button className="heart" onClick={() => setIsOpen(!isOpen)}>
        <HeartIcon className="icon" />
        <span className="badge">{navbarFavouriteItem.length}</span>
      </button>
    </>
  );
}
