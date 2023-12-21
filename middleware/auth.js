
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authenticationMiddleware = async (req, res, next) => {
  
  // access the header
  const authHeader = req.headers.authorization;

  // check if header exists
  // cehck if it follows the patter (Bearer)
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // 401 auth error
    throw new CustomAPIError('No token provided', 401)
  }
  
  // extract the token
  const token = authHeader.split(' ')[1];

  //validate the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const {id, username} = decoded // destructuring the info
    req.user = {id, username} // add info to the request
  
    next() // lauch next middleware

  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401)
  }
}

module.exports = authenticationMiddleware;

