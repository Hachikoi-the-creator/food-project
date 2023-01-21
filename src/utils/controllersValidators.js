module.exports = {
  // * helper for UUID validation
  validateUUID: (uuid) => {
    if (!isNaN(+uuid)) throw new Error("Invalid ID format, expecting an UUID");
    if (typeof id === "undefined") throw new Error("Missing id parameter");
  },

  // * checks if it has needed fields (name, desc, healthyness, steps)
  furtherRecipeCheck: (recipe) => {
    const hasAllInputs = Object.keys(recipe).length === 4;

    if (!hasAllInputs)
      throw new Error("Missing needed inputs to create recipe");

    const { name, desc, healthyness, steps } = recipe;

    const validName = name.length < 99 && name.length > 3;
    const validDesc = desc.length < 150 && desc.length > 10;
    const validHealthyness = healthyness <= 100 && healthyness >= 0;
    const validSteps = Array.isArray(steps) && steps.length > 2;

    if (!(validName && validDesc && validHealthyness && validSteps))
      throw new Error("Invalid format of one of the required inputs");

    return true;
  },
};
