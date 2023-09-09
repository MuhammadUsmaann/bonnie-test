const { ProducationInfo } = require("../db/models");

//Add New User
const createProductionEntry = async (req, res) => {
  const { producation, sales, exports, country, type } = req.body;
  try {
    const res2 = await ProducationInfo.create({
      producation: Number(producation),
      sales: Number(sales),
      export: Number(exports),
      country: country,
      type: type,
    });
    return res.status(200).send({
      result: res2,
    });
  } catch (error) {
    res.status(400).send({
      error: "Failed to Create Data",
      message: error.message,
      code: 400,
    });
  }
};
const getProductionData = async (req, res) => {
  const { country, type } = req.query;
  try {
    let where = {};
    if (country) {
      where.country = country;
    }
    if (type) {
      where.type = type;
    }
    const Producation = await ProducationInfo.findAndCountAll({
      where,
    });
    res.status(200).send({
      result: Producation,
      message: "Founds User List!",
      code: 200,
    });
  } catch (error) {
    res.status(400).send({
      error: "Failed to Fetch Data",
      message: error.message,
      code: 400,
    });
  }
};

module.exports = {
  createProductionEntry,
  getProductionData,
};
