const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const Student = require('../models/student');
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.fields([
    { name: 'tenthMarksheet', maxCount: 1 },
    { name: 'twelthMarksheet', maxCount: 1 },
    { name: 'polytechnicMarksheet', maxCount: 1 }
]), async (req, res) => {
    const { name, rollNo, regNo, mail, batch, age, dob, gender, phoneNo,
        fatherName, fatherPhone, motherName, motherPhone, address, tenthPercentage,
        quota, aadhaarNo, fatherOccupation, motherOccupation, emisNo, professionalphoto
    } = req.body;
    try {
        const isExisting = await Student.findOne({ regNo: regNo });
        // console.log(isExisting);

        if (isExisting) {
            return res.status(203).json({ message: "Student already registered...!" }); // 409 is a more appropriate status code for conflict
        }


        const newStudent = {
            name, rollNo, regNo, mail, batch, age, dob, gender, phoneNo,
            fatherName, fatherPhone, motherName, motherPhone, address,
            quota, aadhaarNo, fatherOccupation, motherOccupation, emisNo, professionalphoto: JSON.parse(professionalphoto),
            tenthPercentage, tenthMarksheet: {
                name: req.files['tenthMarksheet'][0].originalname,
                data: req.files['tenthMarksheet'][0].buffer,
                contentType: req.files['tenthMarksheet'][0].mimetype
            },
            twelthPercentage: req.body.twelthPercentage,
            polytechnicPercentage: req.body.polytechnicPercentage,

        };

        if (req.files['twelthMarksheet']) {
            newStudent.twelthMarksheet = {
                name: req.files['twelthMarksheet'][0].originalname,
                data: req.files['twelthMarksheet'][0].buffer,
                contentType: req.files['twelthMarksheet'][0].mimetype
            };
        }

        if (req.files['polytechnicMarksheet']) {
            newStudent.polytechnicMarksheet = {
                name: req.files['polytechnicMarksheet'][0].originalname,
                data: req.files['polytechnicMarksheet'][0].buffer,
                contentType: req.files['polytechnicMarksheet'][0].mimetype
            };
        }

        const student = await Student.create(newStudent);
        await student.save();

        return res.status(201).json({ message: "Successfully registered...!" });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error...!" })
    }
});

router.get('/:selectedBatch', async (req, res) => {
    try {
        const { selectedBatch } = req.params;

        if (!selectedBatch) {
            return res.status(401).json({ message: "Invalid Resource input...!" })
        }

        const students = await Student.find({ batch: selectedBatch })

        return res.status(201).json(students);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error...!" })
    }
});

router.get('/pdf/:id/:type', async (req, res) => {
    try {
        const { id, type } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send('Student not found');
        }
        let semMarksheet = student.semesterDetails.marksheetDetails
        let file;
        if (type === 'tenth') {
            file = student.tenthMarksheet;
        } else if (type === 'twelth') {
            file = student.twelthMarksheet;
        } else if (type === 'polytechnic') {
            file = student.polytechnicMarksheet;
        }
        else if (type === 'semMarksheet') {
            file = semMarksheet;
        }
        else {
            return res.status(400).send('Invalid file type');
        }

        if (!file || !file.data) {
            return res.status(404).send('File not found');
        }

        res.set('Content-Type', file.contentType);
        res.send(file.data);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/semPdf/:id/:index', async (req, res) => {
    try {
        const { id, index } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send('Student not found');
        }

        const semMarksheet = student.semesterDetails[index].marksheetDetails;


        if (!semMarksheet || !semMarksheet.data) {
            return res.status(404).send('File not found');
        }

        // Extract the MIME type from the semMarksheet contentType

        res.set('Content-Type', 'application/pdf'); // Set the Content-Type header without charset
        res.send(semMarksheet.data);
    } catch (error) {
        console.error("Error fetching PDF:", error);
        res.status(500).send(error);
    }
});


router.get('/getStudent/:regNo', async (req, res) => {
    try {
        const { regNo } = req.params;
        if (!regNo) {
            return res.status(400).json({ message: "Registered number is missing...!" })
        }

        const student = await Student.findOne({ regNo: regNo });

        if (!student) {
            return res.status(401).json({ message: "Registered Number not registered...!" })
        }

        return res.status(201).json({ student })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error...!" })
    }
})


router.post('/updateSemMarks/:regNo', upload.single('semesterMarksheet'), async (req, res) => {
    try {
        const { regNo } = req.params;

        const { semester, subjectDetails } = req.body;
        const grades = JSON.parse(req.body.grades);
        const image = JSON.parse(req.body.image)
        console.log(image);
        const gradeValues = {
            "O": 10,
            "A+": 9,
            "A": 8,
            "B+": 7,
            "B": 6,
            "C": 5,
            "U": 0,
            "SA": 0,
            "W": 0,
            "RA": 0
        };

        // const file = req.file;
        const subDetails = JSON.parse(subjectDetails);

        const student = await Student.findOne({ regNo })

        function calculateGPA(subDetails, gradeValues, grades) {
            let totalGradePoints = 0;
            let totalCredits = 0;

            for (const subDetail of subDetails) {
                const subjectCode = subDetail.subjectCode;
                const subjectCredit = parseFloat(subDetail.subjectCredit);  // Ensure it's a number
                const grade = grades[subjectCode];

                if (grade && gradeValues[grade] !== undefined) {
                    const gradeValue = gradeValues[grade];
                    totalGradePoints += gradeValue * subjectCredit;
                    totalCredits += subjectCredit;
                }
            }

            return { totalGradePoints, totalCredits };
        }

        const { totalGradePoints, totalCredits } = calculateGPA(subDetails, gradeValues, grades);
        const newData = {
            semester: JSON.parse(semester),
            grades,
            image: image.myFile,
            totalCredits,
            totalGradePoints
        };
        student.semesterDetails.push(newData);

        await student.save();

        res.status(200).json(student);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error...!" })
    }
})
module.exports = router;