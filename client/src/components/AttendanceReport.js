import React from 'react';

export default function AttendanceReport({ name, status }) {
  return (
    <div className="container">
      <p>{name}</p>
      <div>
        {status === 'present' ? (
          <span className="present">Present</span>
        ) : (
          <span className="absent">Absent</span>
        )}
      </div>
    </div>
  );
}
