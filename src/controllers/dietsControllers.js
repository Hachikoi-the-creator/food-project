const hardCoddedDiets = require("../hardCoddedDiets");
const { Diet } = require("../db");

// ? Only gets executed if the result from Diet.findAll gave an empty arr, returns the created Diet object
const initialLoadHandler = async () => {
  // this is the format sequelize expects
  const bulkToCreate = hardCoddedDiets.map((d) => ({ dietName: d }));

  await Diet.bulkCreate(bulkToCreate).catch((error) => {
    throw new Error(error.message);
  });

  const uploadedDiets = await Diet.findAll();

  return uploadedDiets;
};

// easier way to export a bunch of functions
module.exports = {
  // * Gets all registers from DB if it's empty add them all to DB
  getAllHandler: async () => {
    const res = await Diet.findAll();

    if (!res.length) {
      return await initialLoadHandler();
    }

    return res;
  },

  // * Gets a single register from DB
  getOneHandler: async (id) => {
    const res = await Diet.findByPk(id);

    return res;
  },

  // * adds one to DB and implicit return
  addOneHandler: async (dietName) => await Diet.create({ dietName }),
};
