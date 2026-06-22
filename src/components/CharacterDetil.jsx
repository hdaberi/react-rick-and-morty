function CharacterDetail({ character }) {
  return (
    <div className="flex-1">
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">{character.name}</h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span> {character.status}</span>
            <span> - {character.species}</span>
          </div>
          <div className="location">
            <p>Last know location :</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            <button className="btn btn--primary">Add to favourit</button>
          </div>
        </div>
      </div>
      <div className="character-episodes"></div>
    </div>
  );
}

export default CharacterDetail;
