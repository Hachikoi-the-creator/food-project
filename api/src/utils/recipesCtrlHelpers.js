function formatOneDBRecipe(recipe) {
  const diets = recipe.Diets.map((diet) => ({
    id: diet.id,
    name: diet.dietName,
  }));
  // explicit because I dont want Diet, but diet (can't change on destructuring)
  return {
    id: recipe.id,
    name: recipe.name,
    desc: recipe.desc,
    healthyness: recipe.healthyness,
    steps: recipe.steps,
    imageUrl: recipe.imageUrl,
    createdInDb: recipe.createdInDb,
    ingredientsList: recipe.ingredientsList,
    diets,
  };
}

function formatOneAPIRecipe(oneRecipe) {
  const {
    id,
    analyzedInstructions,
    extendedIngredients,
    title: name,
    image: imageUrl,
    summary: desc,
    healthScore: healthyness,
    diets: dietTypes,
  } = oneRecipe;

  const ingredientsList = formatedIngredientsAPI(extendedIngredients);
  // .steps could be undefined in some API cases
  const steps = analyzedInstructions[0]?.steps.map((e) => e.step) || [];

  const matchingFormat = {
    id,
    name,
    imageUrl,
    desc,
    healthyness,
    dietTypes,
    steps,
    ingredientsList,
  };

  return matchingFormat;
}

module.exports = {
  formatOneAPIRecipe,
  formatOneDBRecipe,

  getOnlyBasicsApi: (apiResponse) => {
    const formated = apiResponse.map((recipe) => {
      const {
        title: name,
        healthScore: healthyness,
        image: imageUrl,
        diets: dietTypes,
        id,
      } = recipe;
      return { id, name, healthyness, imageUrl, dietTypes };
    });

    return formated;
  },
  // !--------------------------------------------------------------
  getOnlyBasicsFromDB: (dbResponse) => {
    const formated = dbResponse.map((recipe) => {
      const { name, imageUrl, id } = recipe;
      const dietTypes = recipe.Diets.map((diet) => diet.dietName);

      return { id, name, imageUrl, dietTypes };
    });

    return formated;
  },

  // !--------------------------------------------------------------
  getOnlyBasicsWeirdgeDB: (recipeArr) => {
    const recipes = recipeArr.flatMap((e) => e.Recipes);
    const desiredFormat = recipes.map((e) => ({
      id: e.id,
      name: e.name,
      imageUrl: e.imageUrl,
      dietTypes: e.Diets.map((e) => e.dietName),
    }));

    return desiredFormat;
  },
  // !--------------------------------------------------------------
  formateAllAPIRecipes: (recipesArr) => {
    const formatedRecipes = recipesArr.map((recipe) =>
      formatOneAPIRecipe(recipe)
    );

    return formatedRecipes;
  },
  // !--------------------------------------------------------------
  formatAllDBRecipes: (recipesArr) => {
    const formatedRecipes = recipesArr.map((recipe) =>
      formatOneDBRecipe(recipe)
    );

    return formatedRecipes;
  },
};

// * Helper function :D
function formatedIngredientsAPI(ingredients) {
  /**
   * ingredientsList:{
   *  name:ingredients[{}.originalName],
   *  amount:ingredients[{}.measures.metric.amount],
   *  unit:ingredients[{}.measures.metric.unitLong]
   * }
   * */
  if (!ingredients.length) return [];
  const formatedIngredients = ingredients.map((e) => ({
    id: e.id,
    name: e.originalName,
    amount: e.measures.metric.amount,
    unit: e.measures.metric.unitLong,
  }));

  return formatedIngredients;
}
