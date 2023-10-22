import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Offences } from '../Extras/Offences';

const OffenseMain = () => {
    const [students, setStudents] = useState([]);
    const [offenses, setOffense] = useState();
    const [searchedStudent, setSearchedStudent] = useState('');

  const fetchData =  async () => {
    const response = await fetch('http://localhost:8080/api/students/offenses/thisweek')
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      console.log(response)
      setStudents(response);
  }

  const fetchOffenseData =  async () => {
    const response = await fetch('http://localhost:8080/api/api/Strikes/all')
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      console.log(response)
      setOffense(response);
  }


  let copy = students;
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchedStudent(term);
    
    const filtered = copy.filter((item) =>
      item.studentName.toLowerCase().includes(term.toLowerCase())
    );
    setStudents(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };
  
  useEffect(() => {
    fetchData();
  }, []); 

  

  return (
    <div className='container text-center rounded'>
        <h1>Offenses this week</h1>
        <div className='container bg-secondary d-flex justify-content-around p-5 rounded'>
            <Offences text={'Number of offenses'} number={students.length} className='text-white' />
            <div className='w-75'>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Date Added</th>
                        <th>Description</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(student => (
                        <tr key={student.studentId}>
                        <td>{student.studentName}</td>
                        <td>{student.dateAdded}</td>
                        <td>{student.offenseDescription}</td>
                        <td>{student.points}</td>
                        
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
           
           <div className='w-25 m-2'>
              <div className='w-10'>
                <input type='text' placeholder='Search by name' value={searchedStudent} onChange={handleSearch}/>
              </div>
              <div class="card p-1 m-2">
               <Link to={'/addOffense'} class="btn btn-primary">Add Offense</Link >
              </div>
              <div class="card p-1 m-2">
               <Link to={'/'} class="btn btn-primary">Back</Link >
              </div>
           </div>
        </div>
    </div>
  )
}

export default OffenseMain;