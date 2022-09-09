const mongooose=require('mongoose');

const userschema=new mongooose.Schema({
    First_name: {
        type: String,
        unique:true,
        required: true,
      
      },
      Last_name: {
        type: String,
        unique:true,
        required: true,
      
      },
      phone_no: {
        type: Number,
        unique:true,
        required: true,
      
      },
      password: {
        type: String,
        unique:true,
        required: true,
      
      },
    
});

module.exports=mongooose.model("users",userschema);

//dates binary date for bsoon data types