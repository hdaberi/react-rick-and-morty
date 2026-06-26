import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { episodes } from "../../data/data";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";

function CharacterDetail({ selectId }) {
  const [selectCharacter, setselectCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`,
        );
        setselectCharacter(data);
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
      <div className="character-detail">
        <img
          src={selectCharacter.image}
          alt={selectCharacter.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">{selectCharacter.name}</h3>
          <div className="info">
            <span
              className={`status ${selectCharacter.status === "Dead" ? "red" : ""}`}
            ></span>
            <span> {selectCharacter.status}</span>
            <span> - {selectCharacter.species}</span>
          </div>
          <div className="location">
            <p>Last know location :</p>
            <p>{selectCharacter.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to favourit</button>
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default CharacterDetail;
