const express = require("express");
const router = express.Router();

const {
  getCurrencies,
  addCurrency,
} = require("../controllers/currencyControllers");

router.get("/currency/all", getCurrencies);
router.post("/currency/add", addCurrency);

module.exports = router;
