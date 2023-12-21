
const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  
  // access the header
  const authHeader = req.headers.authorization;

  // check if header exists
  // cehck if it follows the patter (Bearer)
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // 401 auth error
    throw new UnauthenticatedError('No token provided');
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
    throw new UnauthenticatedError("Not authorized to access this route")
  }
}

module.exports = authenticationMiddleware;

