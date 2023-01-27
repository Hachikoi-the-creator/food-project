import { ColumnFlexContainer } from "../styles/Var";

export default function TextArea({ name, cols, rows, handler }) {
  const blurHandler = (e) => {
    const valuesArr = e.target.value.split(";");
    const trimmedValues = valuesArr.map((e) => e.trim());

    handler(name, trimmedValues);
  };

  return (
    <ColumnFlexContainer>
      <label htmlFor={name}>Write a {name}</label>
      <textarea
        name={name}
        id={name}
        cols={cols}
        rows={rows}
        onBlur={blurHandler}
        placeholder="WRITE!"
      ></textarea>
    </ColumnFlexContainer>
  );
}
