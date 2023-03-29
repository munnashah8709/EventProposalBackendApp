
const mongose= require("mongoose");
require("dotenv").config();
const mongo = process.env.MONGO_URI
mongose.connect(mongo).then(()=>{
    console.log("db connect successfull")
}).catch((error)=>{
    console.log(error)
})


