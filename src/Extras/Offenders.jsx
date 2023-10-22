import React, { useEffect, useState } from 'react';

export const Offenders = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudent] = useState();

  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchData =  async () => {
    const response = await fetch('http://localhost:8080/api/students/topOffenders/')
      .then(a => {
        return a.json();
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      console.log(response)
      setStudents(response);
  }
  
  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
        <h2>Offenders of the week</h2>
        <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Points</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.studentId}>
              <td>{student.studentName}</td>
              <td>{student.points}</td>
              <td>{student.offenseDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
