import {
  UserIcon,
  UserGroupIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CharacterDetail = ({
  selectId,
  onAddFavourit,
  isAddFavourite,
  onRemoveFavourit,
}) => {
  const [charcter, setCharacter] = useState(null);
  const [episodes, setEpisode] = useState([]);

  useEffect(() => {
    async function fecthData() {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`,
        );
        setCharacter(data);

        const episodeId = data.episode.map((item) => {
          return item.split("/").at(-1);
        });
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`,
        );
        setEpisode([episodeData].flat().slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
      }
    }
    if (selectId) fecthData();
  }, [selectId]);

  if (!charcter || !selectId)
    return (
      <p style={{ flex: 1, color: "white" }}>PLease select a charachter.</p>
    );

  return (
    <div className="character-container">
      <CharacterDetailInfo
        charcter={charcter}
        onAddFavourit={onAddFavourit}
        isAddFavourite={isAddFavourite}
        onRemoveFavourit={onRemoveFavourit}
      />
      <CharachterEpisodes episodes={episodes} />
    </div>
  );
};

export default CharacterDetail;

function CharacterDetailInfo({
  charcter,
  onAddFavourit,
  isAddFavourite,
  onRemoveFavourit,
}) {
  return (
    <div className="character-detail">
      <img
        className="character-detail__img"
        src={charcter.image}
        alt={charcter.name}
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>
            {charcter.gender === "Male" ? (
              <UserIcon className="icon" />
            ) : (
              <UserGroupIcon className="icon" />
            )}
          </span>
          <span> {charcter.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${charcter.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{charcter.status} -</span>
          <span>&nbsp;{charcter.species}</span>
        </div>
        <div className="location">
          <p>Last know location : </p>
          <p>{charcter.location.name}</p>
        </div>
        <div className="actions">
          {isAddFavourite ? (
            <button
              className="btn btn--primary"
              onClick={() => onRemoveFavourit(charcter)}
            >
              Remove to Favourite
            </button>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavourit(charcter)}
            >
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CharachterEpisodes({ episodes }) {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created),
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created),
    );
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of episodes:</h2>
        <button
          className={`icon ${sortBy ? "" : "rotate"}`}
          type="button"
          onClick={() => setSortBy((is) => !is)}
        >
          <ArrowUpCircleIcon className="icon" />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div className="">
              {String(index + 1).padStart(2, 0)} {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
