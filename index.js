const express=require('express')
const app=express()
var cors = require('cors');
const PORT=8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


require("./connection/connection")
require("./schemas/user")
require("./schemas/vendor")
require("./schemas/proposal")

app.use(express.json())
app.use(require("./routes/users"))
app.use(require("./routes/vendors"))
app.use(require("./routes/event"))

app.listen(PORT, ()=>{
    console.log("server starting on port "+ PORT)
})
