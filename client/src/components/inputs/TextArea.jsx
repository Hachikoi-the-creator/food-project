import { ColumnFlexContainer } from "../styles/RecipeMain";
import { TextAreaStyled } from "../styles/FormStuff";

export default function TextArea({ name, cols, rows, handler }) {
  const blurHandler = (e) => {
    const valuesArr = e.target.value.split(";");
    const trimmedValues = valuesArr.map((e) => e.trim());

    handler(name, trimmedValues);
  };

  return (
    <ColumnFlexContainer className="text-area-container">
      <TextAreaStyled className="textarea-inner-wrapper">
        <label className="title" htmlFor={name}>
          Write the {name}
        </label>
        <p>Separate them with a ; (pls)</p>
        <textarea
          name={name}
          id={name}
          cols={cols}
          rows={rows}
          onBlur={blurHandler}
          placeholder="WRITE!"
        ></textarea>
      </TextAreaStyled>
    </ColumnFlexContainer>
  );
}
