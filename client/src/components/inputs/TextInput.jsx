import { ColumnFlexContainer } from "../styles/RecipeMain";

export default function TextInput(props) {
  const { options, name, register, errors } = props;

  return (
    <ColumnFlexContainer className={`input ${name}`}>
      <label htmlFor={name}>{name}</label>
      <input type="text" id={name} {...register(name, options)} />
      {errors.name && <p className="error">Invalid input format</p>}
    </ColumnFlexContainer>
  );
}
