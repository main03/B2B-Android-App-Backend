const express=require("express");

const cors=require("cors");


const Product=require('../ProductSchema/Product')

// const cookieparser=require('cookie-parser');
const AuthenticateAdmin=require('../Middleware/Auth-Admin')
const app=express();
app.use(express.json());


exports.CreateNewProduct=(AuthenticateAdmin,async(req,res)=>
{
  
  const name=req.body.name;
  const price=req.body.price;
  const brand_name=req.body.brand_name;
  const product_quantity=req.body.product_quantity;
  const Admin_refid=req.body.Admin_refid;
  const CategoryId=req.body.CategoryId;
  console.log(req.body);
  const productcreate = new Product({
    name: name,
    price: price,
    brand_name:brand_name,
    product_quantity:product_quantity,
    AdminId:Admin_refid,
    CategoryId:CategoryId
  });
  if (req.file) {
    productcreate.ProductImage = req.file.path;
  }
  productcreate
    .save()
    .then((result) => {
      // console.log(result);
      res.send("Product createdd");
      console.log("Product created Successfully with referencing(Admin_Id & Category Id) ");
    
    })
    .catch((err) => {
      res.send("Error in API Catch");
      console.log(err);
    });

})
exports.GetAllProductList=(AuthenticateAdmin,async(req,res,next)=>
{
  Product.find()
  .populate('CategoryId','category_name')
  
  .then(result=>{
    res.status(200).json({
      productdata:result
      
    });
  
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  });

})
exports.UpdateProduct=(AuthenticateAdmin,(req,res,next)=>
{
  Product.updateOne({_id:req.params.id},
                    {$set:{name:req.body.name,price:req.body.price,brand_name:req.body.brand_name,product_quantity:req.body.product_quantity}}
  ).then((result)=>
  {
    res.status(200).json(result)

  }) .catch(err=>{
    res.status(500).json({
      error:err
    })
  });
})

exports.DeleteProduct=(AuthenticateAdmin,async (req,res)=>
{
  try{
 const deleteproduct=await Product.findByIdAndDelete(req.params.id);
 if(!req.params.id)
 {
  return res.status(400).send();
 }
 res.send(deleteproduct);
}
catch(e)
{
  res.status(500).send(e);
}

})