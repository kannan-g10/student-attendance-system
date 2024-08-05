import React, { useEffect, useState } from 'react';

export default function Container({ name, status, onStatusChange }) {
  const [defaultStatus, setDefaultStatus] = useState(status);

  const handleChange = e => {
    const newStatus = e.target.value;
    setDefaultStatus(newStatus);
    onStatusChange(name, newStatus);
  };

  useEffect(() => {
    // Ensure currentStatus is reset to an empty string if status is empty
    if (status === '') {
      setDefaultStatus('');
    }
  }, [status]);

  return (
    <div className="container">
      <p>{name}</p>
      <div>
        <input
          type="radio"
          value="present"
          name={`${name}-status`}
          id={`present-${name}`}
          onChange={handleChange}
          checked={defaultStatus === 'present'}
        />
        <label htmlFor={`present-${name}`}> Present</label>
        <input
          type="radio"
          value="absent"
          name={`${name}-status`}
          id={`absent-${name}`}
          onChange={handleChange}
          checked={defaultStatus === 'absent'}
        />
        <label htmlFor={`absent-${name}`}> Absent</label>
      </div>
    </div>
  );
}
