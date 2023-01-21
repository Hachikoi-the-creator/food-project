const { DataTypes } = require("sequelize");

module.exports = (database) => {
  database.define(
    "Diet",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      dietName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    { timestamps: false }
  );
};
