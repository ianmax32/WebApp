import React, { useEffect, useState } from 'react';

const Teacher = () => {
  // Sample teacher data (replace with actual data)
  const [teachers, setTeachers] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchData =  async () => {
    const response = await fetch('http://localhost:8080/api/teachers/allTeachers/')
      .then(a => {
        return a.json();
        
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
      console.log(response)
      setTeachers(response);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleShowDetails = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseDialog = () => {
    setSelectedTeacher(null);
  };

  const handleAddTeacher = () => {
    // Implement logic to add a new teacher
    // Update the 'teachers' state with the new teacher
  };

  const handleAssignSubject = () => {
    // Implement logic to assign a subject to a teacher
    // Update the 'teachers' state with the assigned subject
  };

  return (
    <div className="container mt-5">
      <h1>Teacher List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>{teacher.email}</td>
              <td>
                <button
                  className="btn btn-info mr-2"
                  onClick={() => handleShowDetails(teacher)}
                >
                  Show Details
                </button>
                <button className="btn btn-success mr-2" onClick={handleAssignSubject}>
                  Assign Subject
                </button>
                <button className="btn btn-warning">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTeacher && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Teacher Details</h5>
                <button type="button" className="close" onClick={handleCloseDialog}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedTeacher.name}</p>
                <p><strong>Subject:</strong> {selectedTeacher.subject}</p>
                <p><strong>Email:</strong> {selectedTeacher.email}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDialog}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3">
        <button className="btn btn-primary mr-2" onClick={handleAddTeacher}>
          Add Teacher
        </button>
        <button className="btn btn-primary" onClick={handleAssignSubject}>
          Assign Subject
        </button>
      </div>
    </div>
  );
}

export default Teacher;
