import { useEffect, useState } from "react";
import { IngredientInfo, IngredientListContainer } from "./styles/FormStuff";

export default function IngredientsList({
  mainErrorHandler,
  mainSuccessHandler,
}) {
  const [ingArr, setIngArr] = useState([
    { name: "", amount: "", unit: "" },
    { name: "", amount: "", unit: "" },
    { name: "", amount: "", unit: "" },
  ]);

  // * updateRecipesData if everythign went ok
  const successHandler = (id, key, value) => {
    const currObj = ingArr[id];
    const update = { ...currObj, [key]: value };
    console.log("updated entry", update);

    // mainSuccessHandler(id,update)
    setIngArr((prev) => {
      return { ...prev, [id]: update };
    });
  };

  const errorHandler = (iname, ivalue) => {
    // a string representing the error that will be show on top or hot toast
    const errMsg = `invalid ${iname}; got ${ivalue}`;
    console.log("errmsg", errMsg);
    mainErrorHandler(errMsg);
  };

  useEffect(() => {
    console.log("updated state", ingArr);
  }, [ingArr]);

  return (
    <>
      <h3 className="title">Write the recipe ingredients</h3>
      <IngredientListContainer className="ing-list-container">
        {[0, 1, 2].map((id) => (
          <Ingredient
            {...{ id }}
            {...{ errorHandler }}
            {...{ successHandler }}
          />
        ))}
      </IngredientListContainer>
    </>
  );
}

// ******************************************** lil children
function Ingredient({ successHandler, id, errorHandler }) {
  // * ---------cant see lmao---------------- *//
  const blurHandler = (value, inputName) => {
    // amount would be the only numeric value
    console.log("else 1", inputName);
    if (inputName === "amount" && value <= 0) {
      errorHandler(inputName, value);
    } else if (inputName !== "amount" && value.length < 0) {
      errorHandler(inputName, value);
    } else {
      // console.log("value", inputName, "is valid");
      successHandler(id, inputName, value);
    }
  };

  return (
    <IngredientInfo className="ingredient-info" key={id}>
      <div className="input-wrapper">
        <label htmlFor="name">Enter a name:</label>
        <input
          type="text"
          id="name"
          onBlur={(e) => blurHandler(e.target.value, "name")}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="amount">Enter an amount:</label>
        <input
          type="number"
          id="amount"
          onBlur={(e) => blurHandler(e.target.value, "amount")}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="unit">Enter an unit: (grams, spoons, etc...)</label>
        <input
          type="text"
          id="unit"
          onBlur={(e) => blurHandler(e.target.value, "unit")}
        />
      </div>
    </IngredientInfo>
  );
}
