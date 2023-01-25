// todo: use DOMSanitier to use innerHtml safely

export default function Recipe({ data }) {
  const { name, desc, healthyness, imageUrl, steps, diets, createdInDb } = data;
  // Array.prototype.slice()

  // todo: verify if we have X data if the info doesn't come from the DB
  return (
    <div>
      <h3>{name}</h3>
      <img src={imageUrl} alt="todo:" />
      <p dangerouslySetInnerHTML={{ __html: desc }} />
      <p>{healthyness}</p>
      <ol>
        {steps?.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="diets-list">
        {diets?.map((diet) => (
          <span key={diet}>{diet}</span>
        ))}
      </div>
    </div>
  );
}
