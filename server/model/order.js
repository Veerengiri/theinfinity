const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    
    itemname:{
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    qtn: {
        type: Number,
        required: true
    },
    totalprice:{
        type: Number,
        required: true
    },
    isDeliverd:{
        type: Boolean,
        required: true
    },
    sorttime:{
        type: String,
    }
    
})
module.exports = mongoose.model('order',orderSchema);