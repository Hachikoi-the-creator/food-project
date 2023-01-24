const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const {
  furtherRecipeCheck,
  validateUUID,
} = require("../utils/controllersValidators");
const {
  getFormatedApiResponse,
  getOneFormatedApiRes,
} = require("../utils/recipesCtrlHelpers");

const { API_KEY } = process.env;

module.exports = {
  // * --------------------------------------
  // * Get several matches by name - (takes like 5sec holy fuck)
  // * --------------------------------------
  getByNameHandler: async (name, resNum = 13) => {
    if (!name)
      throw new Error("Invalid query type :", (typeof name).toString());

    // ? Better way guarrantees a result from API (70k+ options)
    // const { data: rndRecipes } = await axios(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&number=${resNum}`
    // );
    // * I only use these to get matching title & id, because it doesn't give me steps stuff
    const { data: rndRecipes } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?number=${resNum}&addRecipeInformation=true&apiKey=${API_KEY}`
    );

    const arrOfPromises = rndRecipes.results.filter((e) => {
      const compareRegex = new RegExp(name, "ig");
      if (e.title.match(compareRegex)) {
        return axios(
          `https://api.spoonacular.com/recipes/${e.id}/information?includeNutrition=false&apiKey=${API_KEY}`
        );
      }
    });

    const foundFromApi = await axios.all(arrOfPromises);

    const foundInDb = await Recipe.findAll({
      where: { name: { [Op.substring]: name } },
    });

    if (!foundFromApi.length) return foundInDb;

    const formatedApiResponse = getFormatedApiResponse(foundFromApi);

    return [...formatedApiResponse, ...foundInDb];
  },

  // * --------------------------------------
  // * Add one recipe to DB
  // * --------------------------------------
  addOneHandler: async (recipeData) => {
    /**
     * I love these docs
     * https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
     */
    // will throw error if something is wrong
    furtherRecipeCheck(recipeData);

    // if you send an attr not defined in model, it'll Throw error... :'c
    const { name, desc, healthyness, steps, imageUrl, ingredientsList } =
      recipeData;

    const createdRecipe = await Recipe.create({
      name,
      desc,
      healthyness,
      steps,
      imageUrl,
      ingredientsList,
    });

    // * Link to Diets table
    // need to get all diets
    const allDiets = await Diet.findAll();
    // then compare the names with the ones I get from the recipe
    const matchedDiets = allDiets.filter((dietObj) =>
      recipeData.dietTypes.includes(dietObj.dietName)
    );

    // once I get those I need to do a forEach on them and add them to the instance of the Recipe I just created
    matchedDiets.forEach((diet) => {
      createdRecipe.addDiet(diet);
    });

    return createdRecipe;
  },

  // * --------------------------------------
  // * Get unique recipe by ID
  // * --------------------------------------
  getOneHandler: async (recipeId) => {
    // first API because it's more likely to happen this way (thus +performance)
    if (!isNaN(+recipeId)) {
      const { data: oneRecipe } = await axios(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      const matchingFormat = getOneFormatedApiRes(oneRecipe);

      return matchingFormat;
    }

    const ourRecipe = await Recipe.findByPk(recipeId, {
      include: {
        model: Diet,
        // attributes: { include: ["dietName", "id", "createdInDb"] },
      },
    });

    return ourRecipe;
  },

  // * ------------------ EXTRA POINTS --------------------
  // * Only fetch the recipes we have stored in our DB
  // * --------------------------------------
  getOurRecipesHandler: async () => await Recipe.findAll({ include: Diet }),

  // * --------------------------------------
  // ? Update one recipe (only if it's within our DB)
  // * --------------------------------------
  updateOneHandler: async (id, updatedRecipe) => {
    validateUUID(id);

    furtherRecipeCheck(updatedRecipe);

    // option silent responds with a '0' if the record was not found (doesn't throw error)
    const res = await Recipe.update(updatedRecipe, {
      where: { id },
      silent: true,
    });

    if (!res) throw new Error("Not recipe found in DB, invalid UUID");

    // * Link to Diets table
    const allDiets = await Diet.findAll();
    const matchedDiets = allDiets.filter((dietObj) =>
      updatedRecipe.dietTypes.includes(dietObj.dietName)
    );

    const gottenToLink = await Recipe.findByPk(id);
    matchedDiets.forEach((diet) => {
      gottenToLink.addDiet(diet);
    });

    return res;
  },

  // * -------------------------------------
  // * remove recipe from our DB
  // * -------------------------------------
  removeOneHandler: async (id) => {
    validateUUID(id);

    // if not found, returns null
    const foundRecipe = await Recipe.findByPk(id);

    if (!foundRecipe) throw new Error("Recipe not found in DB");

    await foundRecipe.destroy();
  },
};
