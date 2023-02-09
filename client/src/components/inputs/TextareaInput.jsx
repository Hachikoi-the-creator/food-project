import { ColumnFlexContainer } from "../styles/RecipeMain";

export default function TextareaInput(props) {
  const { options, name, register, errors, label } = props;

  return (
    <ColumnFlexContainer className={`input ${name}`}>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...register(name, options)} />
      {errors.name && <p className="error">Invalid input format</p>}
    </ColumnFlexContainer>
  );
}
