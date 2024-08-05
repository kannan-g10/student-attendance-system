import React, { useEffect, useState } from 'react';

export default function TotalReport({ reports, total, student }) {
  const [presentedDays, setPresentedDays] = useState([]);
  useEffect(() => {
    const present = reports.filter(
      report => report.name === student.name && report.status === 'present'
    );
    setPresentedDays(present);
  }, []);

  return (
    <div className="reports">
      <p>{student.name}</p>
      <p>
        {presentedDays.length} / {total}
      </p>
      <p>{Math.floor((presentedDays.length / total) * 100)} %</p>
    </div>
  );
}
