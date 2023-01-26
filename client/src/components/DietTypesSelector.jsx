import { useSelector } from "react-redux";
import { GenericFlexContainer } from "./styles/FilterStuff";

export default function DietTypesSelector({ label, handler }) {
  const allDiets = useSelector((state) => state.allDiets);

  return (
    <div>
      <GenericFlexContainer className="diet-selector">
        <label>{label}</label>

        <select onChange={(e) => handler(e.target.value)}>
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
