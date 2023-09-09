const {
  SignUp,
  getAllCre,
  Login,
  CheckTokenValidation,
} = require("../controller/credentialsInfo");

const router = require("express").Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/list", getAllCre);
router.post("/tokenValidation", CheckTokenValidation);

module.exports = router;
