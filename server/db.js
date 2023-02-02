const mongoose = require("mongoose");
const mongourl = "mongodb+srv://Veerengiri:762003@cluster0.vjo3ghd.mongodb.net/hotel?retryWrites=true&w=majority"

mongoose.connect(mongourl,{}).then(()=>{
    console.log("connected mongourl successfully");
}).catch((err)=>{console.log(err)})