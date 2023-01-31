import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainContainer } from "../components/styles/Var";
import { OrderedList, RecipeStyles } from "../components/styles/RecipeDetails";

export default function RecipeDetails() {
  // todo: verify if we have X data if the info doesn't come from the DB
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const locationHook = useLocation();
  const { id } = locationHook.state;
  const [recipeData, setRecipeData] = useState({});

  useEffect(() => {
    // get extra info from recipe with ID
    (async () => {
      const { data: recipe } = await axios(`${BASE_URL}/recipes/id/${id}`);
      setRecipeData(recipe);
    })();
  }, []);

  const { name, imageUrl, steps, diets, desc, healthyness } = recipeData;
  // remove annoying ads & securely use innerHtml
  const sortDesc = desc?.split("It is brought")[0];
  const cleanedDesc = decodeURI(encodeURI(sortDesc));

  return (
    <MainContainer className="recipe-container">
      <RecipeStyles className="recipe-inner-wrapper">
        <h2 className="recipe-name">{name}</h2>

        <img className="recipe-img" src={imageUrl} alt="todo:" />

        <p>This recipe has {healthyness}/100 healthy points!</p>

        <h4>Steps:</h4>
        <OrderedList className="ol-steps">
          {steps?.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </OrderedList>

        <h4>Diet types</h4>
        <div className="diets-list">
          {diets?.map((diet) => (
            <span key={diet}>{diet}</span>
          ))}
        </div>

        <h4>Recipe Description</h4>
        <p dangerouslySetInnerHTML={{ __html: cleanedDesc }} />
      </RecipeStyles>
    </MainContainer>
  );
}
