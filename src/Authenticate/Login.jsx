import React, { Component } from 'react';

class UserProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        password: '',
        profile: 'ADMIN',
        username: '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

 

  handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to your API or perform any desired action
    const { password, profile, username } = this.state.formData;
    const requestOptions={
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(this.state.formData)
      }
    fetch('http://localhost:8080/Authenticate/AddUser/',requestOptions)
    .then(a => {
      return a.json();
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
    
    console.log('Submitted Data:', { password, profile, username });
  };

  render() {
    return (
        <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={this.state.formData.username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.formData.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default UserProfileForm;
