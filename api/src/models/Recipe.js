const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define("recipe", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    desc: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    healthyness: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100,
      },
    },
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
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
