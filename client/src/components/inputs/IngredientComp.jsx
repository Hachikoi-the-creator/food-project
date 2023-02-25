import { IngredientsListWrapper } from "../styles/FormStuff";

export default function IngredientComp({ register, index }) {
  // id${index} because otherwise the lib would not create an object
  return (
    <IngredientsListWrapper className="outer-ingredient">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        {...register(`ingredientsList.id${index}.name`)}
      />

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="number"
        {...register(`ingredientsList.id${index}.amount`)}
      />

      <label htmlFor="unit">Unit:</label>
      <input
        type="text"
        id="unit"
        {...register(`ingredientsList.id${index}.unit`)}
      />
    </IngredientsListWrapper>
  );
}
