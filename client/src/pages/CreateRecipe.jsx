import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import inputsValidators from "../utils/inputsValidators";
import Input from "../components/inputs/Input";
import CheckboxOptions from "../components/CheckboxOptions";
import { getAllDiets } from "../redux/actions";
import IngredientsList from "../components/IngredientsList";
import TextArea from "../components/inputs/TextArea";

export default function CreateRecipe() {
  const allDiets = useSelector((state) => state.allDiets);
  const dispatcher = useDispatch();
  const inputInfo = [
    { name: "name", type: "text" },
    { name: "desc", type: "text", tag: "description (can use HTML tags)" },
    { name: "healthyness", type: "number" },
    { name: "imageUrl", type: "text" },
  ];
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    imageUrl: "",
    healthyness: "",
    diets: [],
    steps: "",
    ingredientsList: [{}],
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
  const dietsHandler = (e) => {
    const value = e.target.name;
    const alreadySelected = formData.diets.includes(value);

    setFormData((prev) => {
      const updatedArr = alreadySelected
        ? prev.diets.filter((e) => e !== value)
        : [...prev.diets, value];

      return { ...prev, diets: updatedArr };
    });
  };

  // *********************************************************
  const eraseDietSelections = () => {
    setFormData((prev) => ({ ...prev, diets: [] }));
  };

  // *********************************************************
  const formHandler = async (e) => {
    e.preventDefault();
    // check if there's a error in the state error
    if (error.length) {
      console.log("Theres an error in some innputs", error.toString());
      return;
    }
    // check if some state is empty
    // if (!Object.values(error).every(Boolean)) {
    //   console.log("Not all fields havee been filled");
    //   return;
    // }

    // don't need FormData with Axios :D
    const res = await axios.post(
      "http://localhost:1313/recipes/test",
      formData
    );
    console.log(res);
  };

  // *********************************************************
  const ingredientListHandler = (pseudoID, ingObject) => {
    setFormData((prev) => {
      const modIngredientList = (prev.ingredientsList[pseudoID] = ingObject);
      return { ...prev, ingredientsList: modIngredientList };
    });
  };

  // *********************************************************
  return (
    <div className="create-container">
      <form onSubmit={formHandler}>
        <h1>{error}</h1>

        {/* simple String/Number inputs */}
        {inputInfo.map((e) => (
          <Input key={e.name} {...{ e }} {...{ blurHandler }} />
        ))}
        {/* complex multiple choice */}
        <CheckboxOptions
          options={allDiets}
          title="Select all diets related to the recipe"
          handler={dietsHandler}
        />
        <button onClick={eraseDietSelections}>Unselect All</button>
        {/* Hell of several steps... For now ; sparated would be good enough*/}
        {/* <label htmlFor="steps">
          Write down the steps to cook this recipe, and separate them with an
          semicolon ';'
        </label> */}
        <TextArea name={"steps"} cols={15} rows={10} handler={blurHandler} />
        {/* <textarea
          name="steps"
          id="steps"
          minLength={"20ch"}
          rows="5"
          ref={stepsRef}
          placeholder="WRITE!"
          onBlur={(e) =>
            blurHandler(
              "steps",
              e.target.value.split(";").map((e) => e.trim())
            )
          }
        /> */}
        {/* INGREDIENTS LIST.... */}
        <IngredientsList handler={ingredientListHandler} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
