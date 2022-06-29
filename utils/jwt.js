const jwt = require("jsonwebtoken");
const jwtSecret = 'secretWord'
//require("dotenv").config();   // here we use dotenv module which we installed in the begining to access environment variables from .env file

function generateJWT(user_id) {
  // payload is just an object which usually contains some information about user but not confidential information such as password.
  const payload = {
    user: {
      id: user_id
    }
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

module.exports = generateJWT;  // we export this function to use it inside routes/user.js