// ! EXTRA POINTS

const { Recipe } = require("../db");
const {
  validateUUID,
  furtherRecipeCheck,
} = require("../utils/controllersValidators");

// ! EXTRA POINTS I DID UwU
module.exports = {
  // * --------------------------------------
  // * Only fetch the recipes we have stored in our DB
  getAllRecipesHandler: async () => await Recipe.findAll(),

  // * --------------------------------------
  // * Update one recipe (only if it's within our DB)
  updateOneHandler: async (id, updatedRecipe) => {
    validateUUID(id);

    furtherRecipeCheck(updatedRecipe);

    // option silent responds with a '0' if the record was not found (doesn't throw error)
    const res = await Recipe.update(updatedRecipe, {
      where: { id },
      silent: true,
    });

    if (!res) throw new Error("Not recipe found in DB");

    return res;
  },

  // * --------------------------------------
  // * remove recipe from our DB
  removeOneHandler: async (id) => {
    validateUUID(id);

    // if not found, returns null
    const foundRecipe = await Recipe.findByPk(id);

    if (!foundRecipe) throw new Error("Recipe not found in DB");

    await foundRecipe.destroy();
  },
};
