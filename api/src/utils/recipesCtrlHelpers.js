module.exports = {
  getOnlyBasicsApi: (apiResponse) => {
    const formated = apiResponse.map((recipe) => {
      const {
        title: name,
        healthScore: healthyness,
        image: imageUrl,
        diets: dietTypes,
      } = recipe;
      return { name, healthyness, imageUrl, dietTypes };
    });

    return formated;
  },

  getOnlyBasicsFromDB: (dbResponse) => {
    const formated = dbResponse.map((recipe) => {
      const { name, healthyness, imageUrl } = recipe;
      const dietTypes = recipe.Diets.map((diet) => diet.dietName);

      return { name, healthyness, imageUrl, dietTypes };
    });

    return formated;
  },

  getFormatedApiResponse: (apiResponse) => {
    /*//* How I make transformed the thing that came to be equal to my BD model :D
     *  diets:[empty], cames alone with our DB response
     *
     *  name:title,
     *  desc:summary,
     *  healthyness:healthScore,
     *  imageUrl:image,
     *  steps:analyzedInstructions[{may only have one obj}.steps[{}.step] (for steps),
     * */
    const res = apiResponse.map((recipe) => {
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
      const ingredientsList = getFormatedIngredients(
        recipe.extendedIngredients
      );
      //  recipe.extendedIngredients?.map((ingredient) => ({
      //   name: ingredient.originalName,
      //   amount: ingredient.metric.amount,
      //   unit: ingredient.metric.unitLong,
      // }));

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

    return res;
  },
  // *--------------------------------
  getOneFormatedApiRes: (oneRecipe) => {
    // * steps is more likely null... from API
    const {
      id,
      instructions,
      extendedIngredients,
      title: name,
      image: imageUrl,
      summary: desc,
      healthScore: healthyness,
      diets: dietTypes,
    } = oneRecipe;

    const ingredientsList = getFormatedIngredients(extendedIngredients);

    const matchingFormat = {
      id,
      name,
      imageUrl,
      desc,
      healthyness,
      dietTypes,
      steps: instructions || [],
      ingredientsList,
    };

    return matchingFormat;
  },
};

function getFormatedIngredients(ingredients) {
  /**
   * ingredientsList:{
   *  name:ingredients[{}.originalName],
   *  amount:ingredients[{}.measures.metric.amount],
   *  unit:ingredients[{}.measures.metric.unitLong]
   * }
   * */
  if (!ingredients) return [];

  return {
    name: ingredients.name,
    amount: ingredients.measures?.metric.amount,
    unit: ingredients.measures?.metric.unitLong,
  };
}
