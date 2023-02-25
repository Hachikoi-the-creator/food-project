require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PSW, DB_HOST_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PSW}@${DB_HOST_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Forcing the models to be loaded before the associations are made
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injecting the connection (sequelize) to each model
modelDefiners.forEach((model) => model(sequelize));
// Capitalizing the first letter of the models
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Relationships <3 N:M
const { Recipe, Diet } = sequelize.models;

Diet.belongsToMany(Recipe, {
  through: "Diets_Recipes",
  foreignKey: "DietId",
});

Recipe.belongsToMany(Diet, {
  through: "Diets_Recipes",
  foreignKey: "RecipeId",
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
