const express = require("express");
const router = express.Router();
const multer = require("multer");
const item2 = require("../model/item2");
const fs = require("fs");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

router.post("/api/upload", upload.single("testImage2"), async (req, res) => {

  const saveImage =  await item2({
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    itemImage: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
    saveImage.save().then((res) => {
      console.log("image is saved");
    }).catch((err) => { 
      console.log(err, "error has occur");
      
    });
  res.send("image is saved");
});
router.get('/api/getupload', async (req,res)=>{
  try {
    const  alldata= await item2.find();
    alldata?res.json(alldata):res.json({status:"not found"});
    
  } catch (error) {
    res.json({status:"error"});
  }
})
module.exports = router;
