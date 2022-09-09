// admin end point
const express=require("express");
const mongodb=require('mongodb');
const cors=require("cors");
const bcrypt=require("bcrypt")
const Admin=require('../AdminSchema/AdminSchema');
const AuthenticateAdmin=require('../Middleware/Auth-Admin')
const app=express();

const bodyparser=require('body-parser');

app.use(cors());
// app.use(cookieparser());
const jwt=require("jsonwebtoken");


exports.AdminVerify=( async (req, res,next) => {
    const name = req.body.name;
    const password = req.body.password;
    const admin= await Admin.findOne({ name: name });
    if (!admin) {
      console.log("NAME NOT FOUND OR PASSWORD NOT MATCHED ");
      res.send("not found");
      return;
    } 
    const ismatch=await bcrypt.compare(password, admin.password);
      if (ismatch) {
        console.log("LOGGED IN SUCCESSFULLY ");
        console.log("JSON WEB-TOKEN OF ADMIN IS :");
        const token=await jwt.sign({_id:'6300af4997dcffe28b32da99'},"Helloiamadmin",{expiresIn:"57m"});
        console.log(token);
      
       res.send({token:token});
      // res.send({token:token,name:name,password:password});
       
      } else
      {
        console.log("Name NOT FOUND OR PASSWORD NOT MATCHED ");
        res.send("Not found")
        
      }
      
    });
  
   
  
  //shortcut
  // app.post("/Admin",async (req,resp)=>
  // {
   
  //    console.log(req.body);
  //     let admin=new Admin(req.body);
  //     let result=await admin.save();
  //     resp.send(result);
  // })