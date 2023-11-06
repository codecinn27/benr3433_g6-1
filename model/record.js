const mongoose = require('mongoose')
const Visitor = require('./visitor');

const recordSchema = new mongoose.Schema({
    checkIn:{
        type: Number,
        required: true
    },
    checkOut: Number,
    visitor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Visitor'
    }
})

const Record = mongoose.model('Record', recordSchema);

module.exports = Record; //export this to use it somewhere else