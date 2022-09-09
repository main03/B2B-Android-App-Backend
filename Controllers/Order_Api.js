const express=require("express");

const cors=require("cors");

const Order=require('../OrderSchema/Order')

// const cookieparser=require('cookie-parser');
const AuthenticateAdmin=require('../Middleware/Auth-Admin');
const Product = require("../ProductSchema/Product");
const app=express();
app.use(express.json());




exports.GetAllOrderList=(AuthenticateAdmin,async (req, res, next) => {
    Order.find().populate("ProductId.Object")
      .then((result) => {
        res.status(200).json({
          Orderdata: result,
        });
        // console.log("order posted");
      })
      .catch((err) => {
        res.status(500);
      });
  })

exports.UpdateOrders=(AuthenticateAdmin,(req,res,next)=>
  {
    Order.updateOne({_id:req.params.id},
                      {$set:{OrderTotal :req.body.OrderTotal
                        , OrderStatus:req.body.OrderStatus}}
    ).then((result)=>
    {
      res.status(200).json(result)
  
    }) .catch(err=>{
      res.status(500).json({
        error:err
      })
    });
  })