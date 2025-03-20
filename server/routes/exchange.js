const express = require('express');
const router = express.Router();

const {getExchange, getSymbols} = require('../controllers/exchange');

router.route('/').get(getExchange);
router.route('/symbols').get(getSymbols);

module.exports = router;
