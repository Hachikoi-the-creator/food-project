const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("Recipe", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    // * --------------------------
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [3, 100],
      },
    },
    // * --------------------------
    desc: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [10, 150],
      },
    },
    // * --------------------------
    healthyness: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 10,
        max: 100,
        isNumeric: true,
      },
    },
    // * --------------------------
    steps: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        /**
         * @param {String[]} value An array of steps to make the meal
         */
        validArray(value) {
          return value.every((e) => e.length > 5);
        },
      },
    },
    // * --------------------------
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [10, 120],
      },
      unique: true,
    },
    // * --------------------------
    // tricky way of storing an Object[]
    /** Expectation example
     * [
     *  {
     *    name:"Suryp cool something",
     *    amount:"44" or 88,
     *    unit:"" or "grams"
     *  },
     * ...
     * ]
     * https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
     */
    ingredientsList: {
      allowNull: false,
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("ingredientsList"));
      },
      set: function (val) {
        return this.setDataValue("ingredientsList", JSON.stringify(val));
      },
      validate: {
        /**
         * @param {String} value An stringified array of objects
         */
        everyFieldValid(value) {
          const actuallArr = JSON.parse(value);

          return actuallArr.every((e) => {
            const { name, amount, unit } = e;

            const validIngName = name.length > 0 && name.length < 100;
            // num convertion just in case
            const validMetricAmount = !isNaN(Math.round(+amount));
            // could be an empty string
            const validUnit = unit.length >= 0 && unit.length < 100;

            return validIngName && validMetricAmount && validUnit;
          });
        },
      },
    },
    // * --------------------------
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
