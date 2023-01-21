// ! EXTRA POINTS

const { Router } = require("express");
const errorResponseHelper = require("../utils/routerErrHandler");
const {
  getAllRecipesHandler,
  updateOneHandler,
  removeOneHandler,
} = require("../controllers/ourDbControllers");

const ourDbRouter = Router();

// * --------------------------------------
// * Get all recipes from DB
ourDbRouter.get("/all", async (req, res) => {
  try {
    const allRecipes = await getAllRecipesHandler();
    res.status(200).send(allRecipes);
  } catch (error) {
    const { method, originalUrl } = req;
    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * Update one recipe by PK
ourDbRouter.put("/:id", async (req, res) => {
  const { name, desc, healthyness, steps } = req.body;

  try {
    const updatedRecipe = await updateOneHandler({
      name,
      desc,
      healthyness,
      steps,
    });

    res.status(200).send("Recipe updated succesfully", updatedRecipe);
  } catch (error) {
    const { method, originalUrl } = req;
    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * remove recipe
ourDbRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await removeOneHandler(id);

    res.status(200).send("Succesfully removed Recipe with UUID:", id);
  } catch (error) {
    const { method, originalUrl } = req;
    errorResponseHelper(res, method, originalUrl, error.message);
  }
});
