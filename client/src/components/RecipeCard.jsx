import { Link } from "react-router-dom";
import { Card } from "./styles/RecipeCard";

export default function RecipeCard({ data }) {
  const { createdInDb, name, imageUrl, dietTypes, healthyness, id } = data;

  if (!createdInDb)
    return (
      <Link to={`/details/${name.split` `.pop()}`} state={{ id }}>
        <Card className="diet-card" imgSrc={imageUrl}>
          <div className="inner-wrapper">
            <p className="title">{name}</p>
            <div className="diets-container">
              {dietTypes?.length
                ? dietTypes.map((diet) => <span key={diet}>{diet}</span>)
                : "no found diet types"}
            </div>
          </div>
        </Card>
      </Link>
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
