import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GenericFlexContainer } from "./styles/FilterStuff";
import { filterByDietType } from "../redux/actions";

export default function DietTypesSelector() {
  const allDiets = useSelector((state) => state.allDiets);
  const [selectInput, setSelectInput] = useState("");
  const dispatcher = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;

    setSelectInput(value);
    dispatcher(filterByDietType(value));
  };

  return (
    <div>
      <GenericFlexContainer className="diet-selector">
        <label>Filter by diets</label>

        <select
          onChange={handleChange}
          defaultValue={selectInput.length ? selectInput : "all"}
        >
          {allDiets.map((diet) => (
            <option key={diet.id} value={diet.dietName}>
              {diet.dietName}
            </option>
          ))}
        </select>
      </GenericFlexContainer>
    </div>
  );
}
