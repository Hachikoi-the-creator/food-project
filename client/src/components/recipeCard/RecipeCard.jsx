export default function RecipeCard({ data }) {
  const { createdInDb, name, imageUrl, diets } = data;

  if (!createdInDb)
    return (
      <div className="diet-card">
        <img src={imageUrl} alt={`a really tasty ${name}`} />
        <h3>{name}</h3>
        <p>
          {diets.map((diet) => (
            <span key={diet}>{diet}</span>
          ))}
        </p>
      </div>
    );
  // ---------------------
  else if (createdInDb)
    return (
      <div>
        <h3>
          This was created in my db, thus no idea what format to give it lmao
        </h3>
      </div>
    );
  // ---------------------
  else
    return (
      <>
        <h1>LOADING...</h1>
      </>
    );
}
