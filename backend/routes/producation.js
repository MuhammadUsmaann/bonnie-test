const {
  createProductionEntry,
  getProductionData,
} = require("../controller/producation");

const router = require("express").Router();

router.post("/", createProductionEntry);
router.get("/", getProductionData);

module.exports = router;
