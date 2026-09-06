const mongooose=require('mongoose');
const Schema = mongooose.Schema;

const UpcomingOfferSchema= new mongooose.Schema({
    
    description: {
        type: String,
        required: true
      },
    AdminId:{
        type: Schema.Types.ObjectId,
        ref:'Admin',
        required: true,
      },
      Expiry_Date:
      {
        type: String,
    
        required: true,
      },
      OfferImage:{
        type:String,
        required: true,
        
        
      },
      BuyQuantity:{
        type:Number,
        required: true,
        
        
      },
      GetQuantity:{
        type:Number,
        required: true,
        
        
      },
      BuyItem: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      GetItem: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
},
{ timestamps: true });

module.exports=mongooose.model("UpcomingOffer",UpcomingOfferSchema);

