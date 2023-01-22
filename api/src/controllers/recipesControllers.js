const axios = require("axios");
const { Recipe, Diet } = require("../db");
const {
  furtherRecipeCheck,
  validateUUID,
} = require("../utils/controllersValidators");
const { API_KEY } = process.env;

module.exports = {
  // * --------------------------------------
  // * Get several matches by name - (takes like 5sec holy fuck)
  // * --------------------------------------
  getByNameHandler: async (name, resNum = 13) => {
    // const { data } = await axios(
    //   `https://api.spoonacular.com/recipes/7/information?includeNutrition=false&apiKey=edd0b83af09e4f6baa3d4f1f78ea2a88`
    // );

    // return data;

    if (!name)
      throw new Error("Invalid query type :", (typeof name).toString());

    // ? Better way guarrantees a result from API (70k+ options)
    // const { data: matchedRecipes } = await axios(
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

    const foundInDb = await Recipe.findAll({ where: { name } });

    // avoid trying to format an empty arr from API response
    if (!foundFromApi.length) return foundInDb;

    /*//* How I make transformed the thing that came to be equal to my BD model :D
     *  diets:[empty], cames alone with our DB response
     *
     *  name:title,
     *  desc:summary,
     *  healthyness:healthScore,
     *  imageUrl:image,
     *  steps:analyzedInstructions[{may only have one obj}.steps[{}.step] (for steps),
     *
     * ingredientsList:{
     *  name:extendedIngredients[{}.originalName],
     *  amount:extendedIngredients[{}.measures.metric.amount],
     *  unit:extendedIngredients[{}.measures.metric.unitLong]
     * }
     * */
    const apiResponseFormated = foundFromApi.map((recipe) => {
      // diets could be empty array
      const {
        title: name,
        summary: desc,
        healthScore: healthyness,
        image: imageUrl,
        diets,
      } = recipe;

      // * STEPS * //
      // only one obj here... (tested 20+ times) may be empty...
      const steps = recipe.analyzedInstructions[0]?.steps.map((e) => e.step);

      // * INGREDIENTS_LIST * //
      const ingredientsList = recipe.extendedIngredients?.map((ingredient) => ({
        name: ingredient.originalName,
        amount: ingredient.metric.amount,
        unit: ingredient.metric.unitLong,
      }));

      return {
        name,
        desc,
        healthyness,
        imageUrl,
        steps,
        ingredientsList,
        diets,
        // makes FE work easier :P
        createdInDb: false,
      };
    });

    return [...apiResponseFormated, ...foundInDb];
  },

  // * --------------------------------------
  // ? Add one recipe to DB
  /**
   * I love these docs
   * https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
   */
  addOneHandler: async (recipeData) => {
    // will throw error if something is wrong
    furtherRecipeCheck(recipeData);

    // if you send an attr not defined in model, it'll get ignored :'D
    const createdRecipe = await Recipe.create(
      {
        ...recipeData,
        diets: recipeData.dietTypes,
      },
      { include: Diet }
    );

    return createdRecipe;
  },

  // * --------------------------------------
  // * Get unique recipe by ID - this endpoint doens't exist anymore tho xD
  // * --------------------------------------
  getOneHandler: async (id) => {
    // first API because it's more likely to happen this way (thus +performance)
    if (!isNaN(+id)) {
      const { data: oneRecipe } = await axios(
        ` https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      // get only these from API RESPONSE
      // id, name, desc, healthyness, steps, ingredientsList, dietTypes
      const matchingFormat = {};

      return oneRecipe;
    }

    const ourRecipe = await Recipe.findOne({
      where: { id },
      include: Diet,
    });

    return ourRecipe;
  },
  // ! EXTRA POINTS I DID UwU
  // * --------------------------------------
  // ? Only fetch the recipes we have stored in our DB
  getOurRecipesHandler: async () => await Recipe.findAll({ include: Diet }),
  // * --------------------------------------
  // * Update one recipe (only if it's within our DB)
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
