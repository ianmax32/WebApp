import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Student = () => {
    const axios = require('axios');
  const [students, setStudents] = useState([]);
  const [studentName, setStudent] = useState();

  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchData =  async () => {
    const response = await fetch('http://localhost:8080/api/students/allStudents/')
      .then(a => {
        return a.json();
        
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
      console.log(response)
      setStudents(response);
  }
  
  useEffect(() => {
    fetchData();
  }, []); 

  const handleShowDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleSearch = (e) => {
    e.preventDefault()
    setStudent(e);
  };

  const handleCloseDialog = () => {
    setSelectedStudent(null);
  };

  const searchStudent=(e)=>{
    let copy = students;
    let term = e.target.value;
    setStudents(copy)
    const filtered = copy.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setStudents(filtered)
  }

  return (
    <div className="container mt-5 text-center">
      <h1>Student Management</h1>
      <div className='d-flex justify-content-around main-bg m-3 p-2'>
        <h2>Student List</h2>
        <Link to='/addStudent' className="btn btn-primary">Add Student</Link>
        <form>
            <div class="form-row d-flex justify-content-around">
                <div class="col-8">
                    <input type="text" class="form-control" placeholder="Search student..." onChange={searchStudent}/>
                </div>
              
            </div>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Grade</th>
            <th>Parents Details</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.studentId}>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>{student.parentsDetails}</td>
              <td className=''>
                <button
                  className="btn btn-info mr-3 p-1"
                  onClick={() => handleShowDetails(student)}
                >
                  Show Details
                </button>
                <button className="btn btn-warning ml-3">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Student Details</h5>
                <button type="button" className="close" onClick={handleCloseDialog}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedStudent.name}</p>
                <p><strong>Grade:</strong> {selectedStudent.grade}</p>
                <p><strong>Parents:</strong> {selectedStudent.parents}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDialog}>Close</button>
                <button type="button" className="btn btn-primary">Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;
