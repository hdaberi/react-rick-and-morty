import { UserIcon } from "@heroicons/react/16/solid";
import {
  EyeIcon,
  EyeSlashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Loading } from "./Loading";

const CharacterList = ({ characters, isLoading, onSelectedId, selectId }) => {
  return isLoading ? (
    <Loading />
  ) : (
    <div className="characters-list">
      {characters.map((item) => {
        return (
          <Character
            key={item.id}
            item={item}
          >
            <button className="icon red" onClick={() => onSelectedId(item.id)}>
              {selectId !== item.id ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          </Character>
        );
      })}
    </div>
  );
};

export default CharacterList;

export const Character = ({ item, children }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <ChracterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
};

function ChracterName({ item }) {
  return (
    <h3
      className="name"
      style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
    >
      <span>
        {item.gender === "Male" ? (
          <UserIcon className="icon" />
        ) : (
          <UserGroupIcon className="icon" />
        )}
      </span>
      <span> {item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
