import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDiets } from "../../redux/actions";
import {
  CheckboxInputStyled,
  GridCheckboxContainer,
} from "../styles/FormStuff";
import { ColumnFlexContainer } from "../styles/RecipeMain";

// handlers will be an object with functions to handle remove and check/uncheck
export default function CheckboxOptions(props) {
  const { dietsObj, title, clickHandler, resetDiets } = props;
  const allDiets = useSelector((state) => state.allDiets);
  const dispatcher = useDispatch();

  const clickManager = (e) => {
    const dietName = e.target.value;
    clickHandler(dietName);
  };

  useEffect(() => {
    dispatcher(getAllDiets());
  }, []);

  return (
    <ColumnFlexContainer>
      <h3>{title}</h3>
      <GridCheckboxContainer>
        {allDiets.map((d) => (
          <OneCheckbox
            key={d.id}
            name={d.dietName}
            {...{ clickManager }}
            checked={dietsObj[d.dietName]}
          />
        ))}
      </GridCheckboxContainer>
      <button type="button" onClick={resetDiets} className="middle-btn">
        Reset Selection
      </button>
    </ColumnFlexContainer>
  );
}

function OneCheckbox({ name, clickManager, checked }) {
  const capitalizedName = name[0].toUpperCase() + name.slice(1);

  return (
    <CheckboxInputStyled>
      <label htmlFor={name}>{capitalizedName}</label>
      <input
        type="checkbox"
        id={name}
        onChange={clickManager}
        value={name}
        checked={!!checked}
      />
    </CheckboxInputStyled>
  );
}
