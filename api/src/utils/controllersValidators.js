module.exports = {
  // * helper for UUID validation
  validateUUID: (uuid) => {
    if (!isNaN(+uuid)) throw new Error("Invalid ID format, expecting an UUID");
    if (typeof id === "undefined") throw new Error("Missing id parameter");
  },

  // * checks if it has needed fields (name, desc, healthyness, steps)
  furtherRecipeCheck: (name, desc, healthyness, steps, dietTypes) => {
    const hadAllInputs = [name, desc, healthyness, steps, dietTypes].every(
      Boolean
    );

    if (!hadAllInputs)
      throw new Error("Missing needed inputs to create recipe");

    const validName = name.length < 99 && name.length > 3;
    const validDesc = desc.length < 150 && desc.length > 10;
    const validHealthyness = healthyness <= 100 && healthyness >= 10;
    const validSteps =
      Array.isArray(steps) && steps.length > 2 && steps.length < 100;
    const validDietTypes = dietTypes.every(
      (e) => e.length > 2 && e.length < 50
    );

    if (!validName) errorSenderHelper("name", 3, 99, name.length);

    if (!validDesc) errorSenderHelper("desc", 10, 150, desc.length);

    if (!validHealthyness)
      errorSenderHelper("healthyness", 10, 100, healthyness.length);

    if (!validDietTypes) errorSenderHelper("dietTypes", 2, 50);

    // helper would cut off vital info :C
    if (!validSteps)
      throw new Error(
        "Invalid 'steps' format, expected 2-100 but got:",
        steps.length,
        "and expected type was Arrya but got:",
        typeof steps
      );

    return true;
  },
};

function errorSenderHelper(valueName, min, max, gotVal = "an error lol") {
  throw new Error(
    `Invalid '${valueName}' format, expected ${min} - ${max}, but got:${gotVal}`
  );
}
