import { IngredientInfo } from "../styles/FormStuff";
import { ColumnFlexContainer } from "../styles/RecipeMain";

export default function IngredientComp({ data, index, updateByIndex }) {
  const updateHandler = (key, value) => {
    updateByIndex(index, key, value);
  };

  return (
    <ColumnFlexContainer>
      {["name", "amount", "unit"].map((name) => (
        <DependantInput
          key={name}
          {...{ name }}
          {...{ updateHandler }}
          type={name === "amount" ? "number" : "text"}
          value={data[name]}
        />
      ))}
    </ColumnFlexContainer>
  );
}

// * too much of a pain to modify TextInput component to fix these needs
function DependantInput({ name, type, updateHandler }) {
  return (
    <IngredientInfo>
      <label htmlFor={name}>{name}</label>
      <input
        {...{ type }}
        name={name}
        id={name}
        onChange={(e) => updateHandler(name, e.target.value)}
      />
    </IngredientInfo>
  );
}
