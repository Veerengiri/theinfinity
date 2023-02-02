const mongoose  = require('mongoose');

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: Number,
        required: true
    },
    desc: {
        type: String,
    },
    itemImage:{
        data: Buffer,
        contentType: String,
    }
})
module.exports = mongoose.model('item2',imageSchema);