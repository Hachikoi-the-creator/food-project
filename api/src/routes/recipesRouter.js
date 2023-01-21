const { Router } = require("express");
const errorResponseHelper = require("../utils/routerErrHandler");
const {
  getByNameHandler,
  getOneHandler,
  addOneHandler,
} = require("../controllers/recipesControllers");

const recipesRouter = Router();

// * Only fetch the recipes we have stored in our DB

// * --------------------------------------
// * GET ALL MATCHES OF NAME - query
// * --------------------------------------
recipesRouter.get("/", async (req, res) => {
  const { name, resNum } = req.query;

  try {
    const recipes = await getByNameHandler(name, resNum);
    // extra stuff for better http response 204 doesn't send data back
    recipes.length
      ? res.status(200).json({ result: "Resources Found :D", recipes })
      : res.status(204);
  } catch (error) {
    const { method, originalUrl } = req;

    errorResponseHelper(res, method, originalUrl, error);
  }
});

// * --------------------------------------
// * GET ONE RECIPE - params (if num takes like 15sec else UUID 2sec)
// * --------------------------------------
recipesRouter.get("/:recipeId", async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await getOneHandler(recipeId);

    res.status(200).json({ result: "Resource Found :D", recipe });
  } catch (error) {
    const { method, originalUrl } = req;

    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * ADD ONE RECIPE
// * --------------------------------------
recipesRouter.post("/", async (req, res) => {
  const { name, desc, healthyness, steps } = req.body;

  try {
    const addedRecipe = await addOneHandler({ name, desc, healthyness, steps });

    res
      .status(201)
      .json({ result: "Resource Added Successfully :D", addedRecipe });
  } catch (error) {
    const { method, originalUrl } = req;

    errorResponseHelper(res, method, originalUrl, error.message);
  }
});

module.exports = recipesRouter;
