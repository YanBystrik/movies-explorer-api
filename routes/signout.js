const router = require('express').Router();
const { logout } = require('../controllers/logout');

router.post('/signout', logout);

module.exports = router;
