import { Fragment } from "react";

export default function IngredientsList({ handler }) {
  return (
    <Fragment>
      <Ingredient id={1} {...{ handler }} />
      {/* <Ingredient id={2} {...{ handler }} />
      <Ingredient id={3} {...{ handler }} /> */}
    </Fragment>
  );
}

function Ingredient({ handler }) {
  const blurHandler = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    console.log("key: " + key, "value: " + value);
  };

  return (
    <Fragment>
      <label htmlFor="a">Enter a name:</label>
      <input type="text" id="name" onBlur={blurHandler} />

      <label htmlFor="a">Enter an amount:</label>
      <input type="number" id="amount" onBlur={blurHandler} />

      <label htmlFor="a">Enter an unit:</label>
      <input type="text" id="unit" onBlur={blurHandler} />
    </Fragment>
  );
}
