const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet } = require("../db");
const {
  furtherRecipeCheck,
  validateUUID,
} = require("../utils/controllersValidators");
const {
  getOnlyBasicsApi,
  getOnlyBasicsFromDB,
  formatOneDBRecipe,
  formatOneAPIRecipe,
  formatAllDBRecipes,
} = require("../utils/recipesCtrlHelpers");

const { API_KEY } = process.env;

module.exports = {
  // * --------------------------------------
  // * Get several matches by name - (takes like 5sec holy fuck)
  // * --------------------------------------
  // ? Here I only want imageUrl, name, diets...
  getByNameHandler: async (name, resNum = 13) => {
    if (!name)
      throw new Error("Invalid query type :", (typeof name).toString());

    // ? Better way guarrantees a result from API (70k+ options)
    // const { data: rndRecipes } = await axios(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&number=${resNum}`
    // );
    const { data: rndRecipes } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?number=${resNum}&addRecipeInformation=true&apiKey=${API_KEY}`
    );

    const foundInDb = await Recipe.findAll({
      where: { name: { [Op.substring]: name } },
      include: {
        model: Diet,
      },
    });

    const formatedAPI = getOnlyBasicsApi(rndRecipes.results);
    const formatedDB = getOnlyBasicsFromDB(foundInDb);

    return [...formatedDB, ...formatedAPI];
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
    const {
      name,
      desc,
      healthyness,
      steps,
      imageUrl,
      ingredientsList,
      dietTypes,
    } = recipeData;

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

    // * Link to Diets table BETTER
    // const allDiets = await Diet.findAll({ where: { name: dietTypes } });
    // await createdRecipe.addDiets(allDiets);

    return createdRecipe;
  },

  // * --------------------------------------
  // * Get unique recipe by ID
  // * --------------------------------------
  getOneHandler: async (recipeId) => {
    // first API because it's more likely to happen this way (thus +performance)
    if (!isNaN(+recipeId)) {
      const { data: apiRecipe } = await axios(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      const matchingFormat = formatOneAPIRecipe(apiRecipe);

      return matchingFormat;
    }

    const ourRecipe = await Recipe.findByPk(recipeId, { include: Diet });
    const formatedRecipe = formatOneDBRecipe(ourRecipe);

    return formatedRecipe;
  },

  // * ------------------ EXTRA POINTS --------------------
  // * Only fetch the recipes we have stored in our DB
  // * --------------------------------------

  getOurRecipesHandler: async () => {
    const recipe = await Recipe.findAll({ include: Diet });
    const formatedRecipes = formatAllDBRecipes(recipe);

    return formatedRecipes;
  },

  // * --------------------------------------
  // ? Update one recipe (only if it's within our DB)
  // * --------------------------------------
  updateOneHandler: async (id, updatedRecipe) => {
    validateUUID(id);

    furtherRecipeCheck(updatedRecipe);

    // if exist, just updates and later links, otherwise value overwritten then link diets
    let result = await Recipe.findByPk(id);
    if (existRecipe) {
      result = await Recipe.update(updatedRecipe, {
        where: { id },
      });
    } else {
      result = await this.addOneHandler(updatedRecipe);
    }

    // * Link to Diets table
    const allDiets = await Diet.findAll();
    const matchedDiets = allDiets.filter((dietObj) =>
      updatedRecipe.dietTypes.includes(dietObj.dietName)
    );

    matchedDiets.forEach((diet) => {
      result.addDiet(diet);
    });

    return result;
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
