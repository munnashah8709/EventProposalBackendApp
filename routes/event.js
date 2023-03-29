const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const proposalSchema = require('../schemas/proposal');
const requireLogin=require("../middleware/requireLogin");
const Proposal=mongoose.model("PROPOSAL");


// posting data
router.post('/createProposal',requireLogin, async (req, res) => {
    try {
        const { eventName, place, proposalType, eventType, budget, date_from, date_to, description,
            albums, food, events } = req.body;        
        if (!eventName ||! place||!proposalType||!eventType||!budget||!date_from||!date_to||!description ||! albums ||! food ||! events) {
            return res.status(404).json({
                status: "failed",
                error: "enter all fields"
            })
        }
        else {
            const proposal = await proposalSchema.create({
                eventName, place, proposalType, eventType, budget, date_from, date_to, description,
                albums, food, events,
                postedBy: req.vendor
            });
            return res.status(200).json({
                status: "success",
                proposal
            })
        }
    }
    catch (e) {
        return res.status(422).json({
            status: 'failure',
            message: e.message
        })
    }
})


router.get('/allProposal', requireLogin, async (req, res) => {
    Proposal.find()
    .populate("postedBy","_id name") 
    .sort('-createdAt')
    .then(posts=>{
         res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

// find on behalf of id
router.get('/proposal/:id', async (req, res) => {
    try {
        const data = await proposalSchema.findOne({ _id: req.params.id });
        return res.status(200).json({
            status: "success",
            data
        })
    }
    catch (e) {
        res.status(422).json({
            status: "failure",
            error: e.error
        }) 
    }
})

// update proposal
router.put('/update/:id', async (req, res) => {
    try {
        let data = await proposalSchema.findByIdAndUpdate({ _id: req.params.id }, req.body);
        let newdata = await proposalSchema.findOne({ _id: req.params.id });
        return res.status(200).json({
            message: "updated successfully",
            newdata
        })
    }
    catch (e) {
        res.status(422).json({
            status: "failure",
            error: e.error
        })
    }
})

// delete proposal
router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await proposalSchema.findOne({ _id: req.params.id })
        data.deleteOne()
        return res.status(200).json({
            message: "post deleted successfully"
        })

    }
    catch (e) {
        res.status(422).json({
            status: "failure",
            error: e.error
        })
    }
})

    //finding all proposal listed in db
router.get('/findAllProposal', async(req,res)=>{
    try {
        const data = await proposalSchema.find().populate("postedBy") 
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(400).send('Error in fetch proposals')
    }
})

//to fetch login vendor proposal
router.get('/mypost',requireLogin,(req,res)=>{
    Proposal.find({postedBy:req.vendor._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
            })
    })


module.exports=router