import { FlexWrapper } from "./styles/Var";
import { SelectDietsWrapper } from "./styles/FormStuff";
import { useState } from "react";

function CheckboxOptions({ options, title, handler, resetHandler }) {
  const falseArr = Array(options.length).fill(false);
  // use arr as estate, arr I saw today to store bool if i'ts checked or not
  const [checkedArr, setCheckedArr] = useState(falseArr);

  const clickHandler = (value, index) => {
    handler(value);

    setCheckedArr((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const resetBtnHandler = () => {
    setCheckedArr(falseArr);
    resetHandler();
  };

  return (
    <SelectDietsWrapper>
      <p className="title">{title}</p>
      <FlexWrapper className="checkbox-container">
        {options.map((e, index) => (
          <div key={e.id} className="checkbox-item">
            <label htmlFor={e.dietName}>{e.dietName}</label>
            <input
              checked={checkedArr[index]}
              type="checkbox"
              name={e.dietName}
              id={e.dietName}
              onChange={() => clickHandler(e.dietName, index)}
            />
          </div>
        ))}
      </FlexWrapper>
      <button type="button" onClick={resetBtnHandler} className="reset-btn">
        Unselect All
      </button>
    </SelectDietsWrapper>
  );
}

export default CheckboxOptions;
