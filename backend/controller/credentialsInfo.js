const { CredentialsInfo, UsersInfo } = require("../db/models");
const bcryptjs = require("bcryptjs");
const { createToken, verifyToken } = require("../helpers/jwt.helper");
const HttpStatus = require("http-status");

const SignUp = async (req, res) => {
  const { password } = req.body;
  const saltRounds = 10;
  const HASHED_PASSWORD = bcryptjs.hashSync(password, saltRounds);

  try {
    const CredentialsDetail = await CredentialsInfo.findOne({
      where: { email: req.body.email },
    });
    if (CredentialsDetail) {
      res.status(400).send({
        error: "This Email Already Used",
        code: 400,
      });
    } else {
      const newUser = await UsersInfo.create({
        email: req.body.email,
        name: req.body.name,
      });
      const ser = await CredentialsInfo.create({
        email: req.body.email,
        password: HASHED_PASSWORD,
        userId: newUser.id,
      });
      const tokenObj = {
        uid: newUser.id,
      };
      const jwtToken = await createToken(tokenObj);
      res.status(200).send({
        code: 200,
        result: ser,
        token: jwtToken,
      });
    }
  } catch (error) {
    res.status(400).send({
      error: "Failed to Create new User",
      message: error.message,
      code: 400,
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const CredentialsDetail = await CredentialsInfo.findOne({
      where: { email },
    });
    if (!CredentialsDetail) {
      res.status(400).send({
        error: "Account Does Not Exist",
        code: 400,
      });
    } else {
      const checkPassword = await bcryptjs.compare(
        password,
        CredentialsDetail.password
      );

      if (!checkPassword) {
        return res.status(400).json({
          success: false,
          message: "Password is Incorrect",
        });
      } else {
        const tokenObj = {
          uid: CredentialsDetail.id,
        };
        const jwtToken = await createToken(tokenObj);
        const userDetail = await UsersInfo.findByPk(
          (id = CredentialsDetail.id)
        );
        res.status(200).send({
          code: 200,
          userAuthToken: jwtToken,
          result: userDetail,
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      error: "Failed to Login",
      message: error.message,
      code: 400,
    });
  }
};
const CheckTokenValidation = async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await verifyToken(token);
    if (decodedToken) {
      const credentials = await UsersInfo.findByPk((id = decodedToken.uid));
      if (!credentials) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          //.json({ authorization: [{ message: "Unauthorized" }] })
          .send({
            result: credentials,
            valid: false,
          });
      } else {
        res.status(200).send({
          code: 200,
          result: credentials,
          valid: true,
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      error: "Failed to Check Token",
      message: error.message,
      code: 400,
      valid: false,
    });
  }
};

const getAllCre = async (req, res) => {
  try {
    const CredentialsDetail = await CredentialsInfo.findAndCountAll();
    res.send({
      result: CredentialsDetail,
    });
  } catch (error) {
    res.status(400).send({
      error: "Failed to Create new User",
      message: error.message,
      code: 400,
    });
  }
};

module.exports = {
  SignUp,
  getAllCre,
  Login,
  CheckTokenValidation,
};
