import { useEffect, useRef, useState } from "react";
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
    // console.log(">> useEffected", ingArr);
  }, [ingArr]);

  return (
    <>
      <h3 className="title">Write the recipe ingredients</h3>
      <IngredientListContainer className="ing-list-container">
        {[0, 1, 2].map((id) => (
          <Ingredient
            key={id}
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
  const nameRef = useRef();
  const amountRef = useRef();
  const unitRef = useRef();

  const blurHandler = (inputName) => {
    // avoid unwanted behaivour ON undefined values
    const name = nameRef.current.value || "";
    const amount = amountRef.current.value || 0;
    const unit = unitRef.current.value || "";

    name.length < 1
      ? errorHandler("name", name)
      : successHandler(id, inputName, name);

    amount < 1
      ? errorHandler("amount", amount)
      : successHandler(id, inputName, amount);

    unit.length < 1
      ? errorHandler("unit", unit)
      : successHandler(id, inputName, unit);
  };

  return (
    <IngredientInfo className="ingredient-info" key={id}>
      <div className="input-wrapper">
        <label htmlFor="name">Enter a name:</label>
        <input
          type="text"
          id="name"
          onBlur={() => blurHandler("name")}
          ref={nameRef}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="amount">Enter an amount:</label>
        <input
          type="number"
          id="amount"
          onBlur={() => blurHandler("amount")}
          ref={amountRef}
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="unit">Enter an unit: (grams, spoons, etc...)</label>
        <input
          type="text"
          id="unit"
          onBlur={() => blurHandler("unit")}
          ref={unitRef}
        />
      </div>
    </IngredientInfo>
  );
}
