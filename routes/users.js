const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = mongoose.model("User")
const jwt=require("jsonwebtoken")


router.post('/usersignup', (req, res) => {
    const { name, email, password,contact } = req.body;
    if (!email || !password || !name ||!contact) {
        return res.status(422).json({ error: "please add all the field" })
    }
    User.findOne({ email: email })
        .then((savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: "User already existed with this email" })

            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password:hashedpassword,
                        name,
                        contact
                    })
                    user.save()
                        .then(user => {
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

router.post('/usersignin',(req,res)=>{
    const{email,password}=req.body
    if (!email || !password ) {
        return res.status(422).json({ error: "please add email or password" })
    }
    User.findOne({ email: email })
        .then((savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "inValid email or password" })
}
bcrypt.compare(password,savedUser.password)
.then(doMatch=>{
    if(doMatch){
        // res.json({message:"User Sign in sucessfully"})
        const token=jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
        const{_id,name,email}=savedUser
        res.json({token,user:{_id,name,email}})
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