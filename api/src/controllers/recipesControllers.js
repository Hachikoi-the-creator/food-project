const axios = require("axios");
const { Recipe } = require("../db");
const { furtherRecipeCheck } = require("../utils/controllersValidators");
const { API_KEY } = process.env;

module.exports = {
  // * --------------------------------------
  // * Get several matches by name - (takes like 5sec holy fuck)
  // * --------------------------------------
  getByNameHandler: async (name, resNum = 13) => {
    if (!name)
      throw new Error("Invalid query type :", (typeof name).toString());

    const { data: rndRecipes } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=113&addRecipeInformation=true`
    );

    const foundFromApi = rndRecipes.results.filter((e) => {
      const compareRegex = new RegExp(name, "ig");
      return e.title.match(compareRegex);
    });

    // ? Better way guarrantees a result from API (70k+ options)
    // const { data: matchedRecipes } = await axios(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&number=${resNum}`
    // );

    const foundInDb = await Recipe.findAll({ where: { name } });

    return [...foundFromApi, ...foundInDb];
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

      return oneRecipe;
    }

    const ourRecipe = await Recipe.findByPk(id);

    return ourRecipe;
  },
  // * --------------------------------------
  // * Add one recipe to DB
  // * --------------------------------------
  addOneHandler: async (recipe) => {
    // will throw error if something is wrong
    furtherRecipeCheck(recipe);

    const createdRecipe = await Recipe.create(recipe);
    return createdRecipe;
  },
};
