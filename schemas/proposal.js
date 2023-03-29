const mongoose= require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const proposalSchema = new mongoose.Schema({
eventName:{
    type:String,
    required:true
},
place:{
    type:String,
     required:true
    },
proposalType:{
    type:String,
    required:true
},
eventType:{
    type:String,
    required:true
},
budget:{
    type:String,
    required:true
},
date_from:{
    type:String, 
    required:true
},
date_to:{
    type:String, required:true
},
description:{
    type:String
},
albums:{type:Array},
food:{type:String},
events:{type:String},
postedBy:{
    type:ObjectId, 
    ref:"Vendor"
}
},{timestamps:true})

const proposalModel = mongoose.model("PROPOSAL",proposalSchema)

module.exports = proposalModel;