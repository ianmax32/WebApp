import './Navigation.css';
import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../images/logo.jpeg';

export default function Navigation() {
  return (
    <div className='navmain'>
        <div className="container navbar navbar-expand-lg">
          <span id='brand' className="navbar-brand text-white row" href="#">
            <img src={logo} width="35" height="35" className="d-inline-block align-top rounded-pill col mt-1" alt=""/>
            <h1 className='col'>Arundel School</h1>
          </span>
          <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div id='nav-items' className="navbar-nav mx-auto me-auto mb-2 mb-lg-0">
                  <Link to='/' id='item' className="nav-item text-white nav-link p-3">Home</Link>
                  <Link to='/students' id='item' className="nav-item text-white nav-link p-3">Current Students</Link> 
                  <Link to='/teachers' id='item' className="nav-item text-white nav-link p-3">Teaching and Learning</Link> 
                  <Link to='/Contact' id='item' className="nav-item text-white nav-link p-3">Contact Us</Link>    
              </div>
          </div>
        </div>
    </div>
  )
}
