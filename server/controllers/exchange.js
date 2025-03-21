const axios = require('axios');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');

const getExchange = async (req, res) =>{
    const {amount, targetCurr} = req.query;
    const resFixer = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}`);
    
    const exchangeRate = resFixer.data.rates[targetCurr];
    const exchangedAmount = Math.round((amount*exchangeRate)*10000)/10000;

    let newTotalAmount;
    let newTotalTransactions;

    const prevData = await User.find();
    console.log(prevData);
    
    if(prevData.length>0){
        newTotalAmount =  prevData[0].totalAmount + Number(amount);
        newTotalTransactions = prevData[0].totalTransactions + 1;
        const newData = await User.findOneAndUpdate({_id:prevData[0]._id}, {totalAmount:newTotalAmount, totalTransactions:newTotalTransactions}, {new:true, runValidators:true});
        res.status(StatusCodes.OK).json({exchangedAmount, targetCurr, totalAmount:newTotalAmount, totalTransactions:newTotalTransactions});
        return
    } else{
        const createdData = await User.create({totalAmount:amount, totalTransactions:1});
        res.status(StatusCodes.OK).json({exchangedAmount, targetCurr, totalAmount:amount, totalTransactions:1});
        return
    };
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