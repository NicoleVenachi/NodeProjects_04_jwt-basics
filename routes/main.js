//imports
const express =  require('express')
const {login, dashboard} = require('../controllers/main');

const authMiddleware = require('../middleware/auth');

// inicializo router
const router = express.Router();

// routing
router.post('/login', login);
router.get('/dashboard', authMiddleware, dashboard);


module.exports = router;

