const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Vendor = mongoose.model("Vendor")
const jwt=require("jsonwebtoken")


router.post('/vendorsignup', (req, res) => {
    const { name, email, password,contact } = req.body;
    if (!email || !password || !name ||!contact) {
        return res.status(422).json({ error: "please add all the field" })
    }
    Vendor.findOne({ email: email })
        .then((savedVendor => {
            if (savedVendor) {
                return res.status(422).json({ error: "Vendor already existed with this email" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const vendor = new Vendor({
                        email,
                        password:hashedpassword,
                        name,
                        contact
                    })
                    vendor.save()
                        .then(vendor => {
                            res.json({ message: "Saved data Sucessfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        }))
        .catch(err => {
            console.log(err)
        })
})

router.post('/vendorsignin',(req,res)=>{
    const{email,password}=req.body
    if (!email || !password ) {
        return res.status(422).json({ error: "please add email or password" })
    }
    Vendor.findOne({ email: email })
        .then((savedVendor => {
            if (!savedVendor) {
                return res.status(422).json({ error: "inValid email or password" })
}
bcrypt.compare(password,savedVendor.password)
.then(doMatch=>{
    if(doMatch){
        // res.json({message:"Vendor Sign in sucessfully"})
        const token=jwt.sign({_id:savedVendor._id},process.env.JWT_SECRET)
        const{_id,name,email}=savedVendor
        res.json({token,vendor:{_id,name,email}})
    }
    else{
        return res.status(422).json({ error: "inValid email or password" })
    }
})
.catch(err=>{
    console.log(err)
})
}))
})



module.exports=router