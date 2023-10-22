import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export const AddStudent = () => {
    const [student, setStudent] = useState(
        {
            "grade": 0,
            "name": "",
            "parentsDetails": "",
            "studentId": 0
        }
    );

    const handleChange = (e)=>{
        e.preventDefault();
        const { name, value } = e.target;
        setStudent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(student)
    }

    const handleSubmit= (e) =>{
        e.preventDefault()
        const requestOptions={
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(student)
          }
        var response = fetch('http://localhost:8080/api/students/addStudent',requestOptions)
        .then(a => {
          return a.json();
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
        alert(`Student has been added ${student.name}`,)
        setStudent({
            "grade": 0,
            "name": "",
            "parentsDetails": "",
        })
        console.log(response);
    }
    
    useEffect(() => {
        
    }, []); 

  return (
    <div className='container text-center'>
        <h1>Add Student</h1>
        <form className='form m-5 p-5 bg-secondary text-white rounded' onSubmit={handleSubmit}>
            <div className="form-row">
                <h2 className=''>Student Name</h2>
                <input
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    className='form-control'
                    type='text'
                />
            </div>
            <div className="form-group">
                <h2 htmlFor="password">Form</h2>
                <select
                    name="grade"
                    value={student.grade}
                    onChange={handleChange}
                 className='form-control'>
                    <option value="default">
                        Select a Form
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    
                </select>
            </div>
            <div className="form-row">
                <h2 className=''>Parents Details (email)</h2>
                <textarea
                    name="parentsDetails"
                    value={student.parentsDetails}
                    onChange={handleChange}
                    className='form-control'
                    required
                    type='text'
                    rows={5}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary m-5 bt-lg">
                Add Student
            </button>
        </form>
        <div class="card p-1 m-2">
        <Link to={'/students'} class="btn btn-primary">Back</Link >
        </div>
    </div>
  )
}
