import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";

function CharacterLists({ allCharacters, isLoading, onSelectId, selectId }) {
  return (
    <div className={`characters-list ${isLoading ? "loading" : ""}`}>
      {isLoading ? (
        <Loading />
      ) : (
        allCharacters.map((item) => (
          <Character
            key={item.id}
            item={item}
            onSelectId={onSelectId}
            selectId={selectId}
          >
            <button className="icon red" onClick={() => onSelectId(item.id)}>
              {selectId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        ))
      )}
    </div>
  );
}

export default CharacterLists;

export function Character({ item, children }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span> {item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {item.name}</span>
        <span> - {item.species} </span>
      </div>
      {children}
    </div>
  );
}
