const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { furtherRecipeCheck } = require("../utils/controllersValidators");
const { API_KEY } = process.env;

module.exports = {
  // ? --------------------------------------
  // ? Get several matches by name - (takes like 5sec holy fuck)
  // ? --------------------------------------
  getByNameHandler: async (name, resNum = 13) => {
    if (!name)
      throw new Error("Invalid query type :", (typeof name).toString());

    const { data: rndRecipes } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=${resNum}&addRecipeInformation=true`
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
  // * Add one recipe to DB
  // * --------------------------------------
  /**
   * ? I love these docs <3
  const amidala = await User.create({
  username: 'p4dm3',
  points: 1000,
  profiles: [{
    name: 'Queen',
    User_Profile: {
      selfGranted: true
      }
    }]
  }, {
    include: Profile
  });

  console.log(result);
   */
  addOneHandler: async (name, desc, healthyness, steps, dietTypes) => {
    // will throw error if something is wrong
    furtherRecipeCheck(name, desc, healthyness, steps, dietTypes);

    const createdRecipe = await Recipe.create(
      { name, desc, healthyness, steps, diets: [dietTypes] },
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
  // * Only fetch the recipes we have stored in our DB
  getOurRecipesHandler: async () =>
    await Recipe.findOne({
      include: Diet,
    }),

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
