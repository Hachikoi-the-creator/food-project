const { Router } = require('express');
const dietsRouter = require("./dietsRouter");
const recipesRouter = require("./recipesRouter");

const mainRouter = Router();

mainRouter.use("/diets", dietsRouter);
mainRouter.use("/recipes", recipesRouter);

module.exports = mainRouter;
