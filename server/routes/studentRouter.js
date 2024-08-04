const express = require('express');
const {
  getAllStudents,
  postStudentsAttendance,
} = require('../controllers/studentController');

const router = express.Router();

router.get('/:date', getAllStudents);
router.post('/:date', postStudentsAttendance);

module.exports = router;
