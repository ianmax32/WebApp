import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/mainImage.png'
import studentsImg from '../images/students.jpeg'
import teachers from '../images/teachers.jpeg'
import classroom from '../images/classroom.jpeg'
import detention from '../images/detention.jpeg'
import offense from '../images/offense.jpeg'
import { Offences } from '../Extras/Offences';
import { Offenders } from '../Extras/Offenders';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudent] = useState();

  const fetchData =  async () => {
    const response = await fetch(`http://localhost:8080/api/students/offenses`)
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

  return (
    <div className="container mt-5">
      <h1 className='text-center'>Detention System Main Dashboard</h1>
      <div>
        <Offences text={'Total number of Offences'} number={students.length}/>
        <Offenders />
      </div>
      <div className="row mt-4">
      <div className="col-md-3">
          <div className="card">
          <img src={offense} width={300} height={200} alt="logo" id="logo" class="card-header"/>
            <div className="card-body">
              <h5 className="card-title">Offenses</h5>
              <p className="card-text">View and manage offenses.</p>
              <Link to="/offenses" className="btn btn-primary">Offense</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
          <img src={studentsImg} alt="logo" id="logo" class="card-header"/>
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p className="card-text">View and manage student records.</p>
              <Link to="/students" className="btn btn-primary">Go to Students</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
          <img src={detention} alt="logo" id="logo" class="card-header"/>
            <div className="card-body">
              <h5 className="card-title">Detentions</h5>
              <p className="card-text">View and manage detentions.</p>
              <Link to="/detentions" className="btn btn-primary">Go to Detentions</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
          <img src={classroom} alt="logo" id="logo" class="card-header"/>
            <div className="card-body">
              <h5 className="card-title">Classrooms</h5>
              <p className="card-text">View available classrooms.</p>
              <Link to="/classrooms" className="btn btn-primary">Go to Classrooms</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
          <img src={teachers} alt="logo" id="logo" class="card-header"/>
            <div className="card-body">
              <h5 className="card-title">Teachers</h5>
              <p className="card-text">View Teacher records</p>
              <Link to="/teachers" className="btn btn-primary">Go to Teachers</Link>
            </div>
          </div>
        </div>
      </div>
      <img src={logo} alt="logo" id="logo" class="container dx-auto"/>
    </div>
  );
}

export default Home;
