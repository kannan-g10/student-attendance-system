import './App.css';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { API_URL } from './config/constants';

import Container from './components/Container';
import AttendanceReport from './components/AttendanceReport';

const studentsData = [
  { name: 'Nishi', status: '' },
  { name: 'Raj', status: '' },
  { name: 'Vikram', status: '' },
  { name: 'Vijay', status: '' },
  { name: 'Aditi', status: '' },
];

function App() {
  const toast = useToast();

  const [students, setStudents] = useState(studentsData);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState('');

  const handleStatusChange = (name, status) => {
    const updatedStudents = students.map(student =>
      student.name === name ? { ...student, status } : student
    );
    setStudents(updatedStudents);
  };

  const getStudentsAttendance = async () => {
    try {
      if (!date)
        return toast({
          title: 'Select a date.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      const res = await fetch(API_URL + '/' + date);
      const attendanceDetails = await res.json();

      setAttendance(attendanceDetails.data.attendance);
      setDate('');
      console.log(attendance);
    } catch (err) {
      toast({
        title: 'No record found.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      setAttendance([]);
    }
  };

  const handleSubmit = async () => {
    if (!date) {
      return toast({
        title: 'Select a date to post attendance.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    try {
      const postStudents = await fetch(API_URL + '/' + date, {
        method: 'POST',
        body: JSON.stringify(students),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      document.querySelectorAll('input[type=radio]').checked = false;

      setDate('');

      toast({
        title: 'Students attendance updated.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      const result = await postStudents.json();
      setAttendance(result.data);
      console.log(result.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">
      <header>
        <div className="date-input">
          <label htmlFor="date" className="date">
            Select a Date :
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <button className="search" onClick={getStudentsAttendance}>
            Search
          </button>
        </div>
        <button className="report">Fetch Attendance Report</button>
      </header>
      <main>
        {!attendance.length ? (
          <div className="box">
            {students?.map((student, index) => (
              <Container
                name={student.name}
                status={student.status}
                onStatusChange={handleStatusChange}
                key={index}
              />
            ))}
            <button className="submit" onClick={handleSubmit}>
              Mark Attendance
            </button>
          </div>
        ) : (
          <div className="box">
            {attendance.map(report => (
              <AttendanceReport
                key={report.id}
                name={report.name}
                status={report.status}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
