import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './HomeComponent/Home';
import ViewStudents from './StudentComponent/Student';
import Detentions from './DetentionComponent/Detention';
import Classrooms from './RoomComponent/Room';
import Teachers from './TeacherComponent/Teacher';
import Navigation from './Navigation/Navigation'
import Contact from './Contact/Contact'
import Login from './Authenticate/Login'
import OffenseMain from './OffenseComponent/OffenseMain';
import React, { useEffect, useState } from 'react';
import './App.css';
import { AddOffense } from './OffenseComponent/AddOffense';
import { AddStudent } from './StudentComponent/AddStudent';

function LoggedUser(){
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/students" element={<ViewStudents/>} />
        <Route path="/detentions" element={<Detentions/>} />
        <Route path="/classrooms" element={<Classrooms/>} />
        <Route path="/teachers" element={<Teachers/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
}

function AuthUser(){
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  const [isLogged,setIsLogged] = useState(true);

  useEffect(()=>{
    if(localStorage.getItem("logged")){
      setIsLogged(true)
    }
  },[])

  
  if(isLogged){
    return (
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/students" element={<ViewStudents/>} />
          <Route path="/detentions" element={<Detentions/>} />
          <Route path="/classrooms" element={<Classrooms/>} />
          <Route path="/teachers" element={<Teachers/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/offenses" element={<OffenseMain/>} />
          <Route path="/addOffense" element={<AddOffense/>} />
          <Route path="/addStudent" element={<AddStudent/>} />
        </Routes>
      </BrowserRouter>
    );}else{
      return (
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );}
}

export default App;
