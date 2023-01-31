import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import inputsValidators from "../utils/inputsValidators";
import Input from "../components/inputs/Input";
import CheckboxOptions from "../components/CheckboxOptions";
import { getAllDiets } from "../redux/actions";
import IngredientsList from "../components/IngredientsList";
import TextArea from "../components/inputs/TextArea";

export default function CreateRecipe() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const allDiets = useSelector((state) => state.allDiets);
  const dispatcher = useDispatch();
  const inputInfo = [
    { name: "name", type: "text" },
    { name: "desc", type: "text", tag: "description (can use HTML tags)" },
    { name: "healthyness", type: "number" },
    { name: "imageUrl", type: "text" },
  ];
  const [error, setError] = useState("no input has been filled");
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    imageUrl: "",
    healthyness: "",
    dietTypes: [],
    steps: "",
    ingredientsList: [{}, {}, {}],
  });

  useEffect(() => {
    dispatcher(getAllDiets());
  }, []);

  // *********************************************************
  // 4 basic inputs
  const blurHandler = (key, value) => {
    // returns true or string with error description
    const isValid = inputsValidators[key](value);
    console.log(isValid, "key: " + key, "value: " + value);

    if (isValid.length) {
      //show modal that tells the error and how to solve it
      console.log("error in " + key);
      setError(`Error in ${key} validation`);
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setError("");
    }
  };

  // *********************************************************
  const dietsHandler = (value) => {
    // TODO: debug this shit later
    const alreadySelected = formData.dietTypes.includes(value);

    setFormData((prev) => {
      const updatedArr = alreadySelected
        ? prev.diets.filter((e) => e !== value)
        : [...prev.dietTypes, value];
      console.log(value, updatedArr);

      return { ...prev, dietTypes: updatedArr };
    });
  };

  // *********************************************************
  const eraseDietSelections = () => {
    setFormData((prev) => ({ ...prev, diets: [] }));
  };

  // *********************************************************
  const ingredientListHandler = (pseudoID, ingObject) => {
    setFormData((prev) => {
      const copy = [...prev.ingredientsList];
      copy.splice(pseudoID, 1, ingObject);
      console.log("updated parent: ", copy);

      return { ...prev, ingredientsList: copy };
    });
  };

  // *********************************************************
  const formHandler = async (e) => {
    e.preventDefault();
    // check if there's a error in the state error
    if (error.length) {
      console.log("Theres an error in some innputs", error.toString());
      return;
    }

    // check if some state is empty by looking at the error state & check if have a valid thingy for every ingredient
    const enoughIngredients =
      formData.ingredientsList.length === 3 &&
      formData.ingredientsList.every(
        (obj) => obj.name && obj.amoun && obj.unit
      );

    if (error.length || enoughIngredients) {
      console.log("Err in some state take a look for yourself mf", formData);
    } else {
      console.log("All inputs area valid pog");
      // don't need FormData with Axios :D
      const res = await axios
        .post(`${BASE_URL}/recipes/add`, formData)
        .catch((err) => console.log("failed to create recipe", err));

      console.log(res.data);
    }
  };

  // *********************************************************
  return (
    <div className="create-container">
      <form onSubmit={formHandler} className="flex-center">
        <h1>Enter recipe data</h1>
        <h2 className="error">{error}</h2>

        {/* simple String/Number inputs */}
        {inputInfo.map((e) => (
          <Input key={e.name} {...{ e }} {...{ blurHandler }} />
        ))}
        {/* complex multiple choice */}
        <CheckboxOptions
          options={allDiets}
          title="Select all diets related to the recipe"
          handler={dietsHandler}
          resetHandler={eraseDietSelections}
        />
        {/* Hell of several steps... For now ; sparated would be good enough*/}
        <TextArea name={"steps"} cols={15} rows={10} handler={blurHandler} />

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
