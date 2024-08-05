const express = require('express');
const {
  getAllStudents,
  postStudentsAttendance,
  getAllStudentsReport,
} = require('../controllers/studentController');

const router = express.Router();

router.get('/:date', getAllStudents);
router.post('/:date', postStudentsAttendance);

router.get('/', getAllStudentsReport);

module.exports = router;
