function CharacterLists({ allCharacters }) {
  return (
    <div className="characters-list">
      {allCharacters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CharacterLists;

function Character({ item }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
    </div>
  );
}
