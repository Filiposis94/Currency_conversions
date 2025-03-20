const axios = require('axios');
const {StatusCodes} = require('http-status-codes');

const getExchange = async (req, res) =>{
    const {amount, targetCurr} = req.query;
    const resFixer = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}`);
    
    const exchangeRate = resFixer.data.rates[targetCurr];
    const exchangedAmount = Math.round((amount*exchangeRate)*10000)/10000;
    
    res.status(StatusCodes.OK).json({exchangedAmount, targetCurr});
};

const getSymbols = async (req, res) =>{
    const resFixer = await axios.get(`http://data.fixer.io/api/symbols?access_key=${process.env.FIXER_API_KEY}`);
    const symbols = resFixer.data.symbols;
    res.status(StatusCodes.OK).json({symbols});    
};

module.exports = {
    getExchange,
    getSymbols
}