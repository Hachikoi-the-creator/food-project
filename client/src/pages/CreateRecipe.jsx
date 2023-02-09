import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import inputsValidators from "../utils/inputsValidators";
import CheckboxOptions from "../components/CheckboxOptions";
import { getAllDiets } from "../redux/actions";
import IngredientsList from "../components/IngredientsList";
import TextArea from "../components/inputs/TextArea";

export default function CreateRecipe() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const allDiets = useSelector((state) => state.allDiets);
  const dispatcher = useDispatch();
  const [error, setError] = useState("no input has been filled");
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    imageUrl: "",
    healthyness: "",
    steps: "",
    dietTypes: [],
    ingredientsList: [{}, {}, {}],
  });

  // *********************************************************
  const ingredientListHandler = (pseudoID, ingObject) => {
    setFormData((prev) => {
      const copy = [...prev.ingredientsList];
      copy.splice(pseudoID, 1, ingObject);
      // console.log("updated parent: ", copy);

      return { ...prev, ingredientsList: copy };
    });
  };

  // *********************************************************
  const formHandler = async (e) => {
    e.preventDefault();

    const res = await axios
      .post(`${BASE_URL}/recipes/add`, formData)
      .catch((err) => console.log("failed to create recipe", err));

    console.log("SUCCESS\n", res.data);
  };

  // *********************************************************
  return (
    <div className="create-container">
      <form onSubmit={formHandler} className="flex-center">
        {/* INGREDIENTS LIST.... */}
        <IngredientsList
          mainErrorHandler={(msg) => setError(msg)}
          mainSuccessHandler={ingredientListHandler}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
