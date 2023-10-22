import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const AddOffense = () => {
    const [students, setStudents] = useState([]);
    const [assignOffense, setassignOffense] = useState(
        {
            'strikeId': 0,
            'studentName': 'default'
        }
    );

    const [offenses, setOffenses] = useState([]);

    const fetchData =  async () => {
        const response = await fetch('http://localhost:8080/api/students/allStudents/')
        .then(a => {
            return a.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        console.log(response)
        setStudents(response);
    }

    const fetchDataOffenses =  async () => {
        const response = await fetch('http://localhost:8080/api/Strikes/all')
        .then(a => {
            return a.json();
        })
        .catch(error => {
            console.error('Error fetching offense data:', error);
        });
        console.log(response)
        setOffenses(response);
    }

    const handleChange = (e)=>{
        e.preventDefault();
        const { name, value } = e.target;
        setassignOffense((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(assignOffense)
    }

    const handleSubmit= (e) =>{
        e.preventDefault()
        const requestOptions={
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(assignOffense)
          }
        var response = fetch('http://localhost:8080/api/students/addOffense',requestOptions)
        .then(a => {
          return a.json();
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
        alert(`Offense has been added for student ${assignOffense.studentName}`,)
        setassignOffense({
            'strikeId': 0,
            'studentName': 'default'
        })
        console.log(response);
    }
    
    useEffect(() => {
        fetchData();
        fetchDataOffenses();
    }, []); 

  return (
    <div className='container text-center'>
        <div className='m-3'>
            <h1>Add Offense for Student</h1>
        </div>
        <form className='form m-5 p-5 bg-secondary text-white rounded' onSubmit={handleSubmit}>
            <div className="form-group">
                <h2 className='h-1 '>Student</h2>
                <select
                    name="studentName"
                    value={assignOffense.studentName}
                    onChange={handleChange}
                 className='form-control'>
                    <option value="default">
                        Select a Student
                    </option>
                    {students.map((student) => (
                        <option key={student.studentId} value={student.name}>
                        {student.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <h2 htmlFor="password">Offense that the student committed</h2>
                <select
                    name="strikeId"
                    value={assignOffense.strikeId}
                    onChange={handleChange}
                 className='form-control'>
                    <option value="default">
                        Select a Offense
                    </option>
                    {offenses.map((offense) => (
                        <option key={offense.id} value={offense.id}>
                        {offense.offenseDescription}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary m-5 bt-lg">
                Add Offense
            </button>
        </form>
        <div class="card p-1 m-2">
        <Link to={'/'} class="btn btn-primary">Back</Link >
        </div>
    </div>
  )
}
