function errorSenderHelper(valueName, min, max, gotVal = "an error lol") {
  throw new Error(
    `Invalid '${valueName}' format, expected ${min} - ${max}, but got:${gotVal}`
  );
}

module.exports = {
  // * helper for UUID validation
  validateUUID: (uuid) => {
    if (!isNaN(+uuid)) throw new Error("Invalid ID format, expecting an UUID");
    if (typeof uuid === "undefined") throw new Error("Missing id parameter");
  },

  // * checks if it has needed fields (name, desc, healthyness, steps)
  furtherRecipeCheck: (recipeData) => {
    const {
      name,
      desc,
      healthyness,
      steps,
      dietTypes,
      ingredientsList,
      imageUrl,
    } = recipeData;

    // early return
    const hadAllInputs = Object.values(recipeData).every(Boolean);

    if (!hadAllInputs)
      throw new Error(
        "Missing needed inputs to create recipe or !healthyness>0"
      );

    const validName = name.length < 99 && name.length > 3;
    const validDesc = desc.length < 150 && desc.length > 10;
    const validHealthyness = healthyness <= 100 && healthyness >= 10;
    const validImageUrl = imageUrl.length > 10 && imageUrl.length < 120;

    const validSteps =
      Array.isArray(steps) && steps.length > 2 && steps.length < 100;

    const validDietTypes =
      Array.isArray(dietTypes) &&
      dietTypes.every((e) => e.length && e.length < 50);

    const validIngredientsList =
      Array.isArray(ingredientsList) &&
      ingredientsList.every(
        (ing) => ing.name.length && !isNaN(ing.amount) && ing.unit.length
      );

    if (!validName) errorSenderHelper("name", 3, 100, name.length);

    if (!validDesc) errorSenderHelper("desc", 10, 150, desc.length);

    if (!validDietTypes) errorSenderHelper("dietTypes", 2, 50);

    if (!validImageUrl) errorSenderHelper("imageUrl", 10, 120, imageUrl.length);

    if (!validHealthyness)
      errorSenderHelper("healthyness", 10, 100, healthyness.length);

    // helper would cut off vital info :C
    if (!validSteps)
      throw new Error(
        "Invalid 'steps' format, expected 2-100 but got:",
        steps.length,
        "and expected type was Arrya but got:",
        typeof steps
      );

    if (!validIngredientsList)
      throw new Error(
        `Invalid 'ingredientsList' format, got \n\t${ingredientsList[0].name} as name \n\t${ingredientsList[0].amount} as amount \n\t& ${ingredientsList[0].unit} as unit`
      );

    return true;
  },
};
