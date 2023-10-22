import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddDetention from './AddDetention';
import AddStudentDetention from './AddStudentDetention';
import GetReport from '../Extras/GenerateReport';

const Detention = () => {
  const [detentions, setDetentions] = useState([]);
  const [studentDetentions, setstudentDetentions] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    'date':'',
    'studentName':'',
    'roomName':'',
    'reason':'',
    'attended':''
  });

  const fetchData =  async () => {
    const response = await fetch('http://localhost:8080/api/detention/allDetentions/')
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      setDetentions(response);
  }

  const fetchDataStudentDetentions =  async () => {
    const response = await fetch('http://localhost:8080/api/detention/allStudentOnDetention')
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      console.log(response)
      setstudentDetentions(response);
  }

  const fetchDataStudents =  async () => {
    const response = await fetch('http://localhost:8080/api/students/allStudents/')
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      setStudents(response);
  }

  const fetchTeachersData =  async () => {
    const response = await fetch('http://localhost:8080/api/teachers/allTeachers')
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error fetching teachers data:', error);
      });
      setTeachers(response);
  }

  const fetchRoomsData =  async () => {
    const response = await fetch('http://localhost:8080/api/rooms/allRooms')
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error fetching rooms data:', error);
      });
      setRooms(response);
  }

  const handleDateChange = (e)=>{
    let newDate = detentions.find(detention=>detention.id === e)
    //console.log(newDate)
  }
  
  useEffect(() => {
    fetchData();
    fetchTeachersData();
    fetchRoomsData();
    fetchDataStudents();
    fetchDataStudentDetentions();
  }, []); 

  const handleUpdateStatus = (id) => {
    setDetentions(prevDetentions => {
      return prevDetentions.map(detention => 
        detention.id === id ? { ...detention, status: 'Resolved' } : detention
      );
    });
  };

  const [add, setAdd] = useState(false);
  const [addStudentDet, setStudentDet] = useState(false);
  const addDetention = (e) =>{
    e.preventDefault()
    setAdd(!add)
  }
  const addStudentToDetention = (e) =>{
    e.preventDefault()
    setStudentDet(!addStudentDet)
  }

  const sendEmails = async (e) =>{
    e.preventDefault();
    if(studentDetentions.length === 0){
      alert("No students on detention")
    }else{
      studentDetentions.forEach(async element => {
        console.log(element)
        setStudent((prevState)=>({
          ...prevState,
          element
        }));
        console.log(student)
        const report = await GetReport(element.reason,element.studentName);
        //setTimeout(5000);
        if(report !== null){
          console.log(report)
          setStudent((prev)=>({
            ...prev,
            reason:'Email from school'
          }))
          console.log(student)
          const requestOptions={
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(student)
          }
    
          var response = fetch('http://localhost:8080/api/detention/sendEmail/',requestOptions)
          .then(a => {
            return a.json();
          })
          .catch(error => {
            console.error('Error sending data:', error);
          });
          console.log(response)
        }else{
          setTimeout(4000);
        }
        
      });
    }
   

  }

  

  return (
    <div className="container d-flex justify-content-around p-5 rounded text-center">
     
      <div className='w-50 bg-secondary text-white text-center m-5'>
        <h1>Detentions</h1>
        <table className="table">
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {detentions.map(detention => (
            <tr key={detention.id}>
              <td>{detention.teacherName}</td>
              <td><input type='date' value={detention.date} className='rounded date' disabled
                onChange={handleDateChange(detention.id)}
              /></td>
              <td>{detention.startTime}</td>
              <td>{detention.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addDetention} className='btn btn-primary m-2' >Add Detention</button>{add && <AddDetention display={add} teacherList={teachers} roomList={rooms}/>}
      </div>
      <div className='w-75 m-5'>
      <div className='d-flex justify-content-around'>
        <button onClick={sendEmails} className='btn btn-primary m-2'>Send Emails</button>
        <button onClick={addStudentToDetention} className='btn btn-primary m-2' >Add Student To Detention</button>{addStudentDet && <AddStudentDetention display={addStudentDet} studentList={students} detentionList={detentions}/>}
      </div>
      <h1>Students on Detention</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date</th>
            <th>Room</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {studentDetentions.map(studentDet => (
            <tr key={studentDet.id}>
              <td>{studentDet.studentName}</td>
              <td>{studentDet.date}</td>
              <td>{studentDet.roomName}</td>
              <td>
                {studentDet.attended && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateStatus(studentDet.id)}
                  >
                    Resolve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Detention;
