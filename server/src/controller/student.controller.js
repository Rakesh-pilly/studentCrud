const express = require('express');

const Students = require('../models/students.model.js');

const router = express.Router();

router.get("", async function(req, res){

    const page = +req.query.page || 1;
    const size = +req.query.size || 10;

    const offset = (page- 1)*size;

    const student = await Students.find().skip(offset).limit(size).lean().exec();

    const totalDoc = await Students.find().countDocuments();
    const totalPages = Math.ceil(totalDoc/size);

    return res.status(200).json({student, totalDoc, totalPages});

});

router.get("/:id", async (req, res) => {

    const student = await  Students.findById(req.params.id).lean().exec();

    return res.status(200).json({student})
})

router.post("", async (req, res) =>{

    const student = await Students.create(req.body);

    return res.status(201).json({student})
})


router.patch("/:id" ,   async (req, res) =>{

    const student = await Students.findByIdAndUpdate(req.params.id, req.body, {new: true});

    return res.status(201).json({student})
})

router.delete("/:id", async (req, res) => {

    const student = await Students.findByIdAndDelete(req.params.id,);

    return res.status(200).json({student})
})

module.exports = router;



