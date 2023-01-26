export default function SelectOptions({ options, label, name }) {
  const handleDietTypeChange = (e) => {
    const dietType = e.target.value;
    console.log(dietType);
  };

  return (
    <div>
      <label htmlFor={name}>{label || name}</label>
      <select onChange={handleDietTypeChange}>
        {options.map((diet) => (
          <option key={diet.id} value={diet.dietName}>
            {diet.dietName}
          </option>
        ))}
      </select>
    </div>
  );
}
