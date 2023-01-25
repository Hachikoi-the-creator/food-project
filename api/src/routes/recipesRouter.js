const { Router } = require("express");
const errorResponseHelper = require("../utils/routerErrHandler");
const {
  getByNameHandler,
  getOneHandler,
  addOneHandler,
  getOurRecipesHandler,
  updateOneHandler,
  removeOneHandler,
} = require("../controllers/recipesControllers");

const recipesRouter = Router();

// * Only fetch the recipes we have stored in our DB

// * --------------------------------------
// * GET ALL MATCHES OF NAME - query
// * --------------------------------------
recipesRouter.get("/", async (req, res) => {
  const { name, amount } = req.query;

  try {
    const recipes = await getByNameHandler(name, amount);
    const resultMsg = recipes.length
      ? "Resources Found :D"
      : "Couldn't find anything D:";

    // 204 would be the correct response, but would make FE work harder
    res.status(200).send(recipes);
  } catch (error) {
    const { method, originalUrl } = req;

    errorResponseHelper(res, method, originalUrl, error);
  }
});

// * --------------------------------------
// * GET ONE RECIPE - params (if num takes like 15sec else UUID 2sec)
// * --------------------------------------
recipesRouter.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await getOneHandler(id);

    res.status(200).send(recipe);
  } catch (error) {
    const { method, originalUrl } = req;

    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * ADD ONE RECIPE
// * --------------------------------------
recipesRouter.post("/add", async (req, res) => {
  // good practice to explicitly get them from body
  const {
    name,
    desc,
    healthyness,
    steps,
    dietTypes,
    ingredientsList,
    imageUrl,
  } = req.body;

  try {
    const addedRecipe = await addOneHandler({
      name,
      desc,
      healthyness,
      steps,
      dietTypes,
      ingredientsList,
      imageUrl,
    });

    res
      .status(201)
      .json({ result: "Resource Added Successfully :D", addedRecipe });
  } catch (error) {
    const { method, originalUrl } = req;

    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * Get all recipes from DB
// * --------------------------------------
recipesRouter.get("/all", async (req, res) => {
  try {
    const allRecipes = await getOurRecipesHandler();
    res.status(200).send(allRecipes);
  } catch (error) {
    const { method, originalUrl } = req;
    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// ? Update one recipe by PK
// * --------------------------------------
recipesRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    desc,
    healthyness,
    steps,
    dietTypes,
    ingredientsList,
    imageUrl,
  } = req.body;

  try {
    const updatedRecipe = await updateOneHandler(id, {
      name,
      desc,
      healthyness,
      steps,
      dietTypes,
      ingredientsList,
      imageUrl,
    });

    res
      .status(201)
      .json({ msg: `updated recipe with id ${id}`, updatedRecipe });
  } catch (error) {
    const { method, originalUrl } = req;
    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// ? remove recipe
// * --------------------------------------
recipesRouter.delete("/del/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await removeOneHandler(id);

    res.status(200).json({ msg: "Succesfully removed Recipe with UUID:", id });
  } catch (error) {
    const { method, originalUrl } = req;
    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

module.exports = recipesRouter;
