const express=require("express");

const cors=require("cors");


const User=require('../RetailerSchema/User')

// const cookieparser=require('cookie-parser');
const AuthenticateAdmin=require('../Middleware/Auth-Admin')
const app=express();
app.use(express.json());


//SignuForm or Retailer EndPoint
app.post("/register",async (req,resp)=>
{
   console.log(req.body);
    let user =new User(req.body);
    let result=await user.save();
    resp.send(result);
  
   
   
})

//loginform EndPoint
app.post("/Login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("EMAIL NOT FOUND OR PASSWORD NOT MATCHED ");
    return;
  } else {
    console.log("Congratss Email FOUND");
  }
  bcrypt.compare(password, user.password).then((ismatch) => {
    if (ismatch) {
      console.log("LOGGED IN SUCCESSFULLY ");
      res.send("/register");
    } else {
      console.log("Email NOT FOUND OR PASSWORD NOT MATCHED ");
    }
  });
});

