
//imports
require('dotenv').config();
require('express-async-errors');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const express = require('express');

const mainRouter = require('./routes/main')

// inicializo express app
const app = express();


// middleware
app.use(express.static('./public'));
app.use(express.json());

// routing
app.use('/api/v1', mainRouter)

// middlewares para los 'handlers'

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // on this project we don't use the db
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
