import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";

function CharacterDetail({ selectId, onAddFavourit, isFavourite }) {
  const [selectCharacter, setselectCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`,
        );
        setselectCharacter(data);
        console.log(data);

        const episodeId = data.episode.map((e) => e.split("/").pop());
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`,
        );
        setEpisodes([episodeData].flat().slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error, {
          position: "top-right",
        });
      } finally {
        setIsLoading(false);
      }
    }
    if (selectId) fetchData();
  }, [selectId]);

  if (isLoading)
    return (
      <div className="flex-1">
        <Loading />
      </div>
    );

  if (!selectId || !selectCharacter)
    return <div className="flex-1 white">Pleas select a character</div>;

  return (
    <div className="flex-1">
      <Toaster />
      <CharachtersDetail
        onAddFavourit={onAddFavourit}
        isFavourite={isFavourite}
        selectCharacters={selectCharacter}
      />
      <Episodes episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;

function CharachtersDetail({ onAddFavourit, isFavourite, selectCharacters }) {
  return (
    <div className="character-detail">
      <img
        src={selectCharacters.image}
        alt={selectCharacters.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">{selectCharacters.name}</h3>

        <div className="info">
          <span
            className={`status ${selectCharacters.status === "Dead" ? "red" : ""}`}
          ></span>
          <span> {selectCharacters.status}</span>
          <span> - {selectCharacters.species}</span>
        </div>

        <div className="location">
          <p>Last know location :</p>
          <p>{selectCharacters.location.name}</p>
        </div>

        <div className="actions">
          {isFavourite ? (
            <p>Character has alredy add to favourite</p>
          ) : (
            <button
              onClick={() => onAddFavourit(selectCharacters)}
              className="btn btn--primary"
            >
              Add to favourit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Episodes({ episodes }) {
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of episode : </h2>
        <button>
          <ArrowUpCircleIcon className="icon" />
        </button>
      </div>
      <ul>
        {episodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, 0)} - {item.episode} :{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
