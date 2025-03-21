const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    totalAmount:{
        type:Number,
        required:[true, 'Please provide the total amount']
    },
    totalTransactions:{
        type:Number,
        required:[true, 'Please provide the total transactions']
    }
});

module.exports = mongoose.model('User', UserSchema);