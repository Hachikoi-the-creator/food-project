import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GenericFlexContainer } from "./styles/FilterStuff";
import { filterByDietType } from "../redux/actions";
import styled from "styled-components";

const dietsa = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto-vegetarian",
  "ovo-vegetarian",
  "egan",
  "pescetarian",
  "paleo",
  "primal",
  "low FODMAP",
  "whole30",
];

const DietsFilter = styled.div`
  p {
    text-align: center;
  }

  .btns-container {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;

    .active {
      border: 2px solid var(--pink);
    }
  }
`;

export default function DietTypesSelector() {
  const allDiets = useSelector((state) => state.allDiets);
  // const [selectInput, setSelectInput] = useState("");
  const [currDiet, setcurrDiet] = useState("");
  const dispatcher = useDispatch();

  const handleChange = (dietType) => {
    setcurrDiet(dietType);
    dispatcher(filterByDietType(dietType));
  };

  return (
    <GenericFlexContainer>
      <DietsFilter>
        <p>Filter by Diets</p>
        <div className="btns-container">
          {dietsa.map((diet) => (
            <button
              key={diet}
              onClick={() => handleChange(diet)}
              className={`${diet === currDiet && "active"}`}
            >
              {diet}
            </button>
          ))}
        </div>
      </DietsFilter>
    </GenericFlexContainer>
  );
  // return (
  //   <div>
  //     <GenericFlexContainer className="diet-selector">
  //       <label>Filter by diets</label>

  //       <select
  //         onChange={handleChange}
  //         defaultValue={selectInput.length ? selectInput : "all"}
  //       >
  //         {allDiets.map((diet) => (
  //           <option key={diet.id} value={diet.dietName}>
  //             {diet.dietName}
  //           </option>
  //         ))}
  //       </select>
  //     </GenericFlexContainer>
  //   </div>
  // );
}
