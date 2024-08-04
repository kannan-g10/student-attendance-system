const Attendance = require('../models/attendanceModel');
const Student = require('../models/studentModel');

exports.getAllStudents = async (req, res, next) => {
  try {
    console.log(req.params.date);

    let { date } = req.params;
    date = new Date(date);
    console.log(date);

    const attendanceDate = await Attendance.findOne({ where: { date } });
    if (!attendanceDate)
      return res
        .status(404)
        .json({ status: 'fail', message: 'attendance record not found.' });

    const students = await Student.findAll({
      where: { attendanceId: attendanceDate.id },
    });

    res.status(200).json({ status: 'success', data: { attendance: students } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

exports.postStudentsAttendance = async (req, res, next) => {
  try {
    const { date } = req.params;
    const students = req.body;
    console.log(students);

    const attendanceDate = await Attendance.create({ date });

    const studentsToUpdate = students.map(student => ({
      ...student,
      attendanceId: attendanceDate.id,
    }));

    const student = await Student.bulkCreate(studentsToUpdate);

    res.status(200).json({ status: 'success', data: student });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};
