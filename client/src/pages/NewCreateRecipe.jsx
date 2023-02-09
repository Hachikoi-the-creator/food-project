import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormInnerWrapper,
  IngredientsListWrapper,
} from "../components/styles/FormStuff";
import TextInput from "../components/inputs/TextInput";
import CheckboxInput from "../components/inputs/CheckboxInput";
import RangeInput from "../components/inputs/RangeInput";
import TextareaInput from "../components/inputs/TextareaInput";
import IngredientComp from "../components/inputs/IngredientsList";
import {
  ColumnFlexContainer,
  FlexWrapper,
} from "../components/styles/RecipeMain";

export default function NewCreateRecipe() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [dietsObj, setDietsObj] = useState({});
  const [ingredientsList, setIngredientsList] = useState([
    { name: "", amount: 0, unit: "" },
  ]);

  const onSubmit = (data) => {
    console.log(data);
    console.log(dietsObj, ingredientsList);
  };

  const checkboxClickHandler = (dietName) => {
    setDietsObj((prev) => {
      const copy = { ...prev };
      copy[dietName] = !prev[dietName];
      // console.log(copy);
      return copy;
    });
  };

  const updateIngredient = (index, key, value) => {
    setIngredientsList((prev) => {
      // const updatedIngs = { ...prev[index] };
      // const updatedState = [...prev];

      // updatedIngs[key] = value;
      // updatedState[index] = updatedIngs;
      // console.log(updatedState);

      prev[index][key] = value;
      // console.log(prev);
      return prev;
    });
  };

  const addOneMoreIngredient = () => {
    setIngredientsList((prev) => [...prev, { name: "", amount: 0, unit: "" }]);
  };

  const removeLastIng = () => {
    if (ingredientsList.length === 1) return;

    setIngredientsList((prev) => {
      const copy = [...prev];
      copy.pop();
      return copy;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInnerWrapper>
        <div>
          <TextInput
            options={{ maxLength: 20, required: true }}
            name="name"
            {...{ register }}
            {...{ errors }}
          />

          <TextareaInput
            options={{ minLength: 10, required: false }}
            name="desc"
            label="Enter food description"
            {...{ register }}
            {...{ errors }}
          />

          <RangeInput
            hookStuff={{
              options: { required: true },
              name: "healthyness",
              register,
              errors,
              watch,
            }}
            min={10}
            max={100}
            step={10}
          />
        </div>
        {/* 

        <div>
          <TextInput
            options={{ maxLength: 20, required: true }}
            name="image url"
            {...{ register }}
            {...{ errors }}
          />

          <TextareaInput
            options={{ minLength: 20, required: true }}
            name="steps"
            label="desc ; separated"
            {...{ register }}
            {...{ errors }}
          /> 
        </div>
          */}
      </FormInnerWrapper>

      {/* <CheckboxInput
        resetDiets={() => setDietsObj({})}
        clickHandler={checkboxClickHandler}
        title="Choose diets"
        {...{ dietsObj }}
      />

      <ColumnFlexContainer>
        <FlexWrapper>
          {ingredientsList.map((data, i) => (
            <IngredientComp
              key={i}
              index={i}
              {...{ data }}
              updateByIndex={updateIngredient}
            />
          ))}
        </FlexWrapper>

        <FlexWrapper>
          <button
            onClick={addOneMoreIngredient}
            className="middle-btn"
            type="button"
          >
            Add 1 more
          </button>

          <button
            onClick={removeLastIng}
            className="middle-btn"
            type="button"
            disabled={ingredientsList.length === 1}
          >
            Remove last
          </button>
        </FlexWrapper>
      </ColumnFlexContainer> */}

      <button>Submit</button>
    </form>
  );
}
