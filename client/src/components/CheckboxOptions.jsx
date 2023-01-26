export default function CheckboxOptions({ options, title, handler }) {
  return (
    <div className="checkbox-container">
      <p>{title}</p>
      {options.map((e) => (
        <div key={e.id} className="checkbox-item">
          <label htmlFor={e.dietName}>{e.dietName}</label>
          <input
            type="checkbox"
            name={e.dietName}
            id={e.dietName}
            onClick={handler}
          />
        </div>
      ))}
    </div>
  );
}
