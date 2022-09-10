const mongooose=require('mongoose');

const adminschema= new mongooose.Schema({
    name:String,
    password:String,
    
    
},
{ timestamps: true });

module.exports=mongooose.model("Admin",adminschema);

//dates binary date for bsoon data types