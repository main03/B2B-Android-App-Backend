const mongooose=require('mongoose');
const Schema = mongooose.Schema;

const regionschema= new mongooose.Schema({
    
    region: {
        type: String,
        unique:true,
        required: true
      },
    
    capital: {
        type: String,
        required: true
      },

    AdminId:{
        type: Schema.Types.ObjectId,
        ref:'Admin',
        required: true
      }
},
{ timestamps: true });

module.exports=mongooose.model("regions",regionschema);


