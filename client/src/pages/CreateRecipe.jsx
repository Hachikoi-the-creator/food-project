import Input from "../components/Input";
import inputsValidators from "../utils/inputsValidators";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import CheckboxOptions from "../components/CheckboxOptions";

export default function CreateRecipe() {
  const allDiets = useSelector((state) => state.allDiets);
  const inputInfo = [
    { name: "name", type: "text" },
    { name: "desc", type: "text", tag: "description (can use HTML tags)" },
    { name: "healthyness", type: "number" },
    { name: "imageUrl", type: "text" },
  ];
  const stepsRef = useRef();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    imageUrl: "",
    healthyness: "",
    diets: [],
    steps: "",
    ingredientsList: "",
  });

  // ? 4 basic inputs
  const blurHandler = (key, value) => {
    const isValid = inputsValidators[key](key);
    console.log(isValid);

    if (isValid.length) {
      //show modal that tells the error and how to solve it
      console.log("error in " + key);
      setError(`Error in ${key} validation`);
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setError(null);
    }
  };

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

  const eraseDietSelections = () => {
    setFormData((prev) => ({ ...prev, diets: [] }));
  };

  const formHandler = () => {
    // check if there's a error in the state error
    // check all inputs have the data we expect them to have
    // do a new FormData() and check the back get's all the info expects to get
    // do a full post and check it was added to the DB
  };

  return (
    <div className="create-container">
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
      <label htmlFor="steps">
        Write down the steps to cook this recipe, and separate them with an
        semicolon ';'
      </label>
      <textarea
        name="steps"
        id="steps"
        minLength={"20ch"}
        rows="5"
        ref={stepsRef}
        placeholder="WRITE!"
      />
    </div>
  );
}
