const mongoose = require("mongoose");
const mongourl = ""

mongoose.connect(mongourl,{}).then(()=>{
    console.log("connected mongourl successfully");
}).catch((err)=>{console.log(err)})