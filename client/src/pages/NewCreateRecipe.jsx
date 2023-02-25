import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AddRemoveBtn,
  FormInnerWrapper,
  IngListMainContainer,
  IngredientsListWrapper,
} from "../components/styles/FormStuff";
import TextInput from "../components/inputs/TextInput";
import CheckboxInput from "../components/inputs/CheckboxInput";
import RangeInput from "../components/inputs/RangeInput";
import TextareaInput from "../components/inputs/TextareaInput";
import {
  ColumnFlexContainer,
  FlexWrapper,
} from "../components/styles/RecipeMain";
import IngredientComp from "../components/inputs/IngredientComp"
import removeSvg from "/minus-btn.svg"
import addSvg from "/plus-btn.svg"
import { VarFlexContainer } from "../components/styles/Var";

export default function NewCreateRecipe() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [dietsObj, setDietsObj] = useState({});
  const [ingAmount, setIngAmount] = useState(1)

  const onSubmit = (data) => {
    // ingredients is an object get the values 
    // && need to filter only those that have all props
    console.log(data);
  };

  const checkboxClickHandler = (dietName) => {
    setDietsObj((prev) => {
      const copy = { ...prev };
      copy[dietName] = !prev[dietName];
      // console.log(copy);
      return copy;
    });
  };

  const removeIngBtn = () => {
    if (ingAmount === 1) return
    setIngAmount(prev => prev - 1)
  }

  /* console.log( watch("ingredientsList")) */

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

          {/* <TextareaInput
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

        <div>
          <TextInput
            options={{ minLength: 10, required: true }}
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
          /> */}
        </div>
      </FormInnerWrapper>

      <h2>Ingredients</h2>

      <VarFlexContainer>
        <AddRemoveBtn type="button" onClick={() => setIngAmount(prev => prev + 1)}>
          <img src={addSvg} alt="add another ingredient" />
        </AddRemoveBtn>

        <AddRemoveBtn type="button" onClick={removeIngBtn}>
          <img src={removeSvg} alt="remove last ingredient" />
        </AddRemoveBtn>
      </VarFlexContainer>

      <IngListMainContainer>
        {Array(ingAmount).fill(0).map((_, i) => (
          <IngredientComp {...{ register }} index={i} key={i} />
        ))
        }
      </IngListMainContainer>

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
