import './App.css';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { API_URL } from './config/constants';

import Container from './components/Container';
import AttendanceReport from './components/AttendanceReport';
import TotalReport from './components/TotalReport';

const studentsData = [
  { name: 'Sonali', status: '' },
  { name: 'Raj', status: '' },
  { name: 'Vikram', status: '' },
  { name: 'Vijay', status: '' },
  { name: 'Aditi', status: '' },
];

function App() {
  const toast = useToast();

  const [students, setStudents] = useState(studentsData);
  const [studentsReport, setStudentsReport] = useState(studentsData);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState('');
  const [reportStatus, setReportStatus] = useState(false);
  const [report, setReport] = useState([]);
  const [total, setTotal] = useState(0);

  const handleStatusChange = (name, status) => {
    const updatedStudents = students.map(student =>
      student.name === name ? { ...student, status } : student
    );
    setStudents(updatedStudents);
  };

  const getStudentsAttendance = async () => {
    try {
      setReportStatus(false);
      if (!date) {
        setDate('');
        setAttendance([]);
        return toast({
          title: 'Select a date.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
      const res = await fetch(API_URL + '/' + date);
      const attendanceDetails = await res.json();

      setAttendance(attendanceDetails.data.attendance);
      setDate('');
    } catch (err) {
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

      const resetStudents = students.map(student => ({
        ...student,
        status: '',
      }));

      setStudents(resetStudents);

      setDate('');

      toast({
        title: 'Students attendance updated.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      const result = await postStudents.json();
      setAttendance(result.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleReports = async () => {
    try {
      const reports = await fetch(API_URL);
      const res = await reports.json();

      setTotal(res.totalDays);
      setReport(res.data);
      setReportStatus(true);
      if (!total) {
        return toast({
          title: 'No Records.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error('Something went wrong');
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
        <button className="report" onClick={handleReports}>
          Fetch Attendance Report
        </button>
      </header>
      <main>
        {reportStatus && total ? (
          <div>
            <div className="report-title">
              <p>Name</p>
              <p>Presents</p>
              <p>Percentage</p>
            </div>
            {studentsReport.map((student, index) => (
              <TotalReport
                student={student}
                reports={report}
                total={total}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div>
            {attendance.length ? (
              <div className="box">
                {attendance.map(report => (
                  <AttendanceReport
                    key={report.id}
                    name={report.name}
                    status={report.status}
                  />
                ))}
              </div>
            ) : (
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
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
