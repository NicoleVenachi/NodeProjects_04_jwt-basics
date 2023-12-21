
// imports
const CustomAPIError = require("../errors/custom-error");

const jwt = require("jsonwebtoken");


// if wsename and password are provided, cfreate the JWT
const login = async (req, res) => {

  const {username, password} = req.body;

  //check if username and password are present. We could do it using:
  // -> mongo validation (la que ya vimos, que sale de los schemas), 
  // -> a layer of validation for every requests (package JOI me ahorra esto)
  // -> o simplemente check in the controller (ver si los mandaron, en este caso)
  if (!username || !password) {
    throw new CustomAPIError('Please provide a username or password', 400);
  }

  const id = new Date().getDate() // ya que no estamos usando la db, de momento puede ser este el id.

  // si fue valido el user, creo token
  const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});

  // console.log(username, password);


  res.status(200).json({msg: 'user created', token}) //envio token


} // pa pedir el token



// dashboard accesible by authenticated users (if JWT is present.)
const dashboard = async(req, res) => {
  
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
    // console.log(decoded);


    // ***route response/logic **
    const luckyNumber = Math.floor(Math.random() *100);

    res.status(200).json(
      {msg:`Hello, ${decoded.username}!`, 
      secret:`Here is your authorized data, your lucky nuymber is ${luckyNumber}`
    })
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401)
  }
  
  

} // para probar la authorization

module.exports = {
  login,
  dashboard
}