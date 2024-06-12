const express = require('express');
const mongoose = require('mongoose');
const Batch = require('../models/batch');
const Semester = require('../models/semester')

const router = express.Router();

router.post('/addSem', async (req, res) => {
    const { subjects, selectedBatch, semester } = req.body;

    try {
        const newSemesters = {
            semester,
            subjects
        }
        let batch = await Batch.findOne({ duration: selectedBatch });

        if (!batch) {
            batch = new Batch({
                duration: selectedBatch,
                semesterDetails: [],
                totalStudents: 0
            });
        }

        batch.semesterDetails.push(newSemesters);

        await batch.save();

        res.status(200).json(batch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/getBatch', async (req, res) => {
    try {
        const batch = await Batch.find({})

        res.status(201).json(batch)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error...!" })
    }
})

router.get('/:batch', async (req, res) => {
    try {
        const { batch } = req.params;
        const batchDetails = await Batch.find({ duration: batch });

        return res.status(201).json({ batchDetails });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error...!" })
    }
})

module.exports = router