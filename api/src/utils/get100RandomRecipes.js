const axios = require("axios");
const { API_KEY } = process.env;

const get100RandomRecipes = async () => {
  const { data: rndRecipes } = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?number=113&addRecipeInformation=true&apiKey=${API_KEY}`
  );

  return rndRecipes.results;
};

module.exports = get100RandomRecipes;
