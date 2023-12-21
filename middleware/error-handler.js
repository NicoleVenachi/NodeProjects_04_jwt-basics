const {CustomAPIError} = require('../errors')
const {StatusCodes} = require('http-status-codes');


const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    // instance sera del padre, pero realmente es uno de los hijos, ya que no lancé previamente nunca direcamente al padre
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware
