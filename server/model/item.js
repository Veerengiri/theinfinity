const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String
    },
    itemImage: {
        type: String
    }
})
module.exports = mongoose.model('item',itemSchema);