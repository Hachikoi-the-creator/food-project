import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainContainer } from "../components/styles/Var";
import { OrderedList, RecipeStyles } from "../components/styles/RecipeDetails";

export default function RecipeDetails() {
  // todo: verify if we have X data if the info doesn't come from the DB
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // import.meta.env.VITE_API_BASE_URL;

  const locationHook = useLocation();
  const { id } = locationHook.state;
  const [recipeData, setRecipeData] = useState({});
  const { name, imageUrl, steps, diets, desc, healthyness } = recipeData;

  useEffect(() => {
    // get extra info from recipe with ID
    (async () => {
      const { data: recipe } = await axios(`${BASE_URL}/recipes/id/${id}`);
      setRecipeData(recipe);
    })();
  }, []);

  console.log(recipeData);

  return (
    <MainContainer className="recipe-container">
      <RecipeStyles className="recipe-inner-wrapper">
        <h2 className="recipe-name">{name}</h2>

        <img className="recipe-img" src={imageUrl} alt="todo:" />

        <p>This recipe has {healthyness}/100 healthy points!</p>

        <OrderedList className="ol-steps">
          {steps?.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </OrderedList>

        <div className="diets-list">
          {diets?.map((diet) => (
            <span key={diet}>{diet}</span>
          ))}
        </div>

        <p dangerouslySetInnerHTML={{ __html: desc }} />
      </RecipeStyles>
    </MainContainer>
  );
}
