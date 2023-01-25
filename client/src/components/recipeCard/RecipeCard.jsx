import { Link } from "react-router-dom";

export default function RecipeCard({ data }) {
  const { createdInDb, name, imageUrl, dietTypes, healthyness } = data;
  const link = `${name.split(" ").pop()}-${healthyness}`;

  if (!createdInDb)
    return (
      <div className="diet-card">
        <img src={imageUrl} alt={`a really tasty ${name}`} />
        <h3>
          <Link to={link}>{name}</Link>{" "}
        </h3>
        <div className="diets-container">
          {dietTypes?.length
            ? dietTypes.map((diet) => <span key={diet}>{diet}</span>)
            : "no found diet types"}
        </div>
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
