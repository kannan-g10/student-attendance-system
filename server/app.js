const express = require('express');
const cors = require('cors');

const sequelize = require('./config/db');
const Attendance = require('./models/attendanceModel');
const Student = require('./models/studentModel');

const studentRoute = require('./routes/studentRouter');

const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/attendance', studentRoute);

Attendance.hasMany(Student);
Student.belongsTo(Attendance);

sequelize
  .sync()
  .then(result => app.listen(port, console.log(`server running on ${port}`)))
  .catch(err => {
    console.log(err.message);
  });
