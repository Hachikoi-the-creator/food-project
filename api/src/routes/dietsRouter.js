const { Diet } = require("../db");
const { Router } = require("express");
const errorHandlerHelper = require("../utils/routerErrHandler");
const {
  getAllHandler,
  getOneHandler,
  addOneHandler,
} = require("../controllers/dietsControllers");

const dietsRouter = Router();

// * --------------------------------------
// * GET ALL DIETS
// * --------------------------------------
dietsRouter.get("/", async (req, res) => {
  try {
    const allDiets = await getAllHandler();

    res.status(200).send(allDiets);
  } catch (error) {
    const { method, originalUrl } = req;

    errorHandlerHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * GET ONE DIET - params
// * --------------------------------------
dietsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const oneDiet = await getOneHandler(id);

    res.status(200).send(oneDiet);
  } catch (error) {
    const { method, originalUrl } = req;

    errorHandlerHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * ADD ONE DIET - query
// * --------------------------------------
dietsRouter.post("/add", async (req, res) => {
  const { newDiet } = req.query;

  try {
    const addedDiet = await addOneHandler(newDiet);

    res.status(201).send(addedDiet);
  } catch (error) {
    const { method, originalUrl } = req;

    errorHandlerHelper(res, method, originalUrl, error.message);
  }
});

module.exports = dietsRouter;
