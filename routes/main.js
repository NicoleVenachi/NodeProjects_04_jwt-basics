//imports
const express =  require('express')
const {login, dashboard} = require('../controllers/main');

// inicializo router
const router = express.Router();

// routing
router.get('/dashboard', dashboard);

router.post('/login', login);

module.exports = router;

