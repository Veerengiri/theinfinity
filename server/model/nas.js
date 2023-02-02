const mongoose = require("mongoose");
const newSchema= mongoose.Schema({
    headline:{
        type:String,
        required:true
    },
    desc: {
        type:String
    },
    date: {
        type: String,
        required: true
    }
})
module.exports=mongoose.model('nas',newSchema);