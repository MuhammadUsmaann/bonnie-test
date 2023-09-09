const jwt = require("jsonwebtoken");
const tokenExpiration = process.env.TOKEN_EXPIRATION;
const jwtSecret = process.env.JWT_SECRET;

const createToken = (tokenObj) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      tokenObj,
      `${jwtSecret}`,
      { expiresIn: `${tokenExpiration}d` },
      (err, token) => {
        if (err || !token) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, `${jwtSecret}`, (err, decodedToken) => {
      if (err || !decodedToken) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
};

module.exports = { verifyToken, createToken };
