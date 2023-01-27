const { Router } = require("express");
const errorHandlerHelper = require("../utils/routerErrHandler");
const {
  getAllHandler,
  getOneHandler,
  addOneHandler,
  getAllRelated,
} = require("../controllers/dietsControllers");

const dietsRouter = Router();
// * --------------------------------------
// * GET ALL DIETS
// * --------------------------------------
// - GET **diets/all** : Get all diets from DB
dietsRouter.get("/all", async (req, res) => {
  try {
    const allDiets = await getAllHandler();

    res.status(200).send(allDiets);
  } catch (error) {
    const { method, originalUrl } = req;

    errorHandlerHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * GET ALL RELATED - query
// * --------------------------------------
dietsRouter.get("/related", async (req, res) => {
  const { dietName } = req.query;

  try {
    const relatedDiets = await getAllRelated(dietName);

    res.status(200).send(relatedDiets);
  } catch (error) {
    const { method, originalUrl } = req;

    errorHandlerHelper(res, method, originalUrl, error.message);
  }
});

// * --------------------------------------
// * GET ONE DIET - params
// * --------------------------------------
// - GET **diets/id/:id** : get a single diet from BD by UUID
dietsRouter.get("/id/:id", async (req, res) => {
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
// - POST **diets/add?newDiet=<DietName>** : Add a diet by name to DB
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

// * --------------------------------------
// * DELETE by id/pk - query
// * --------------------------------------
// - DELETE **diets/del?dietId=<DietId>** : Delete Diet From DB
dietsRouter.delete("/del/:dietId", async (req, res) => {
  const { dietId } = req.query;

  try {
    const addedDiet = await removeOneHandler(dietId);

    res.status(200).send(addedDiet);
  } catch (error) {
    const { method, originalUrl } = req;

    errorHandlerHelper(res, method, originalUrl, error.message);
  }
});

module.exports = dietsRouter;
