const express = require('express');
const malik = require('../model/malik');
const item = require('../model/item');
const nas = require('../model/nas');
const router = express.Router();
const bycrpt = require("bcryptjs");
const multer = require('multer');
const path =require('path');
const fs = require('fs');


// const registerdata = require('../../../final cardGenerator/src/server/models/register');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"itemImages");
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
const upload = new multer({
    storage:storage
})
router.post('/api/additems',upload.array("itemImage"),async(req,res)=>{
    try {
        const filename = req.files;
        const {name,price,desc }=req.body;

        const newitem = new item({
            name:name,
            desc:desc,
            itemImage: filename[0].filename,
            price:price,
        })
        const data = await newitem.save();
        if(data){
            res.status(200).json({status:"ok",name:name})
            
        }
        else{
            res.status(200).json({status:"error"});
            
        }
    } catch (err) {
        res.status(500).json({status:"server error"});
        
    }
});



// router.post('/api/updateitem/:itemid',upload.array("itemImage"),async (req,res)=>{
//     try {
//         const filename = req.files;
//         const {name,price,desc }=req.body;
//         const {itemid}=req.params;
//         const dt = item.findById(itemid);
//         const data=await item.findByIdAndUpdate(itemid,{
//             name:name,
//             desc:desc,
//             itemImage: filename[0].filename,
//             price:price,
        
//         });
//         if(data){
//             let paths = `./itemImages/${dt.itemImage}`
//             fs.unlinkSync(paths);
//             res.json({status:"ok"});
//         }
//     } catch (error) {
//         res.json({status:"error"});
//     }
    
// },(err,result)=>{
//     if(err){
//         console.log(error);
//     }else{
//         console.log("updated sucssfully");
//     }
// })
router.get('/api/updateitemprice/:itemid/:price',async (req,res)=>{
    try {
        const {itemid,price}=req.params;
        const data =await item.findByIdAndUpdate(itemid,{price: price});
        if(data){
            res.status(200).json({status:"change price successfully"});
        }else{
            res.status(200).json({status:"not found error"});
        }
    } catch (error) {
        res.status(500).json({status:"server error"});
    }
});
router.get('/api/showitems',async (req,res)=>{
    try {
        const data = await item.find();
        res.json({item:data});
    } catch (error) {
        res.json("error");
    }
})
router.get('/api/searchitems/:keyword',async (req,res)=>{
    try {
        const {keyword}=req.params;
        const data = await item.find({"name": new RegExp(keyword)});
        res.json({item:data});
    } catch (error) {
        res.json("error");
    }
})
router.get('/api/deleteitem/:itemid',async (req,res)=>{
    const {itemid}=req.params;
    try {
        const data =await item.findByIdAndDelete(itemid);
        if(data){
            let paths = `./itemImages/${data.itemImage}`
            fs.unlinkSync(paths);
            res.status(200).json({status:"ok"})
        }
    } catch (error) {
        res.send({status:"error"})
    }
})
router.post('/api/addnas',async (req,res)=>{
    const {headline,desc}=req.body;
    const dt = new Date();
    const date = dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear();
    try {
        const nass = await nas.create({
            headline,
            desc,
            date,
        })
        res.json({status:"ok"})
    } catch (error) {
        res.json({status:"error"})
    }
})
router.get('/api/shownas',async (req,res)=>{
    try {
        const news =await nas.find();
        res.json({status:"ok",news});
    } catch (error) {
        res.json({status:"ok"});
    }
})
router.get('/api/deletnas/:nasid',async (req,res)=>{
    try {
        const {nasid}=req.params;
        const news =await nas.findByIdAndDelete(nasid);
        
        if(news){
            res.json({status:"delet news successfully"})
        }
    } catch (error) {
        res.json({status:"error"})
    }
})
router.post('/api/addmalik',async (req,res)=>{
    try {
        const {name,email,mobileNo,password}=req.body;
        const salt = await bycrpt.genSalt(10);
        const sespass = await bycrpt.hash(password, salt);

        const admin = await malik.create({
            name:name,
            email:email,
            mobileNo: mobileNo,
            password:sespass,
        })
        if(admin){
            res.json({status:"ok"});
        }
        
    } catch (error) {
        res.json({status:"admin already exists"});
    }
})
router.get('/api/removemalik/:id',async (req,res)=>{
    
    try {
        const {id}=req.params;
        
        const admin = await malik.findByIdAndDelete(id);
        if(admin){
            res.json({status:"admin remove sucessfully"});
        }
        else{
            res.json({status:"admin not removed"});
        }
    } catch (error) {
        res.json({status:"server error"});
    }
})
router.get('/api/getmalik/:adminid', async (req,res)=>{
    try {
        const {adminid}=req.params;
        const admin = await malik.findById(adminid);
        if(admin){
            res.json({status:"ok",admin});
        }
    } catch (error) {
        res.json({status:"not found"});
    }
})
router.get('/api/getallmalik',async (req,res)=>{
    try {
        const {adminid}=req.params;
        const admin = await malik.find();
        if(admin){
            res.json({status:"ok",admin});
        }
    } catch (error) {
        res.json({status:"not found"});
    }
})
router.post('/api/loginmalik',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const admin  = await malik.findOne({email: email});
        const compare = await bycrpt.compare(password, admin.password);
        if(compare){
            res.json({status:'ok',admin});
        }else{
            res.json({status:"not found"})
        }
    } catch (error) {
        res.json({status:"admin not found"})
    }

})
router.get('/api/addmincp/:email/:password',async (req,res)=>{
    try {
        const {email,password}=req.params;
        const salt = await bycrpt.genSalt(10);
        const sespass = await bycrpt.hash(password, salt);
        const users = await malik.findOne({email:email});
        const data = await malik.findByIdAndUpdate(users._id,{password:sespass});
        res.json({status:"admin change password succesfully"});
    } catch (error) {
        res.json({status:"password not changed"})
    }
})
router.post('/api/updateadmin',async (req,res)=>{
    try {
        const {adminid,name,mobileNo}=req.body;
        const admin =await malik.findByIdAndUpdate(adminid,{name:name,mobileNo:mobileNo});
        if(admin){
            res.json({status:"update admin successfully"});
        }
    } catch (error) {
        res.json({status:"admin not updated"});
    }
})
module.exports=router