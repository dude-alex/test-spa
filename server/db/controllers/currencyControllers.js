const Currency = require("../models/cyrrencyModel");

module.exports.getCurrencies = async (req, res) => {
  await Currency.find({})
    .then((result) => {
      return res.status(200).send({
        status: 200,
        data: result,
      });
    })
    .catch((error) => {
      return res.status(400).send({
        status: 400,
        message: "Get currencies error",
      });
    });
};

module.exports.addCurrency = async (req, res) => {
  const currency = Currency(req.body);

  await currency
    .save()
    .then((result) => {
      return res.status(201).send({
        status: 201,
        data: result,
      });
    })
    .catch((error) => {
      return res.status(400).send({
        status: 400,
        message: "Create currency error",
      });
    });
};
