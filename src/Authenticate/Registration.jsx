import React, { Component } from 'react';

class UserProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        password: '',
        profile: 'default',
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

  requestOptions={
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(this.state.formData)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to your API or perform any desired action
    const { password, profile, username } = this.state.formData;
    fetch('http://localhost:8080/Authenticate/AddUser/',this.requestOptions)
    .then(a => {
      return a.json();
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
    console.log(response)
    setStudents(response);
    console.log('Submitted Data:', { password, profile, username });
  };

  render() {
    return (
      <div>
        <h2>User Register Form</h2>
        <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                type="text"
                name="username"
                value={this.state.formData.username}
                onChange={this.handleChange}
                required
                />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.formData.password}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="profile">Profile:</label>
            <select
              name="profile"
              value={this.state.formData.profile}
              onChange={this.handleChange}
            >
              <option value="default" disabled>
                Select a profile
              </option>
              <option value="admin">Admin</option>
              <option value="user">Staff</option>
              <option value="guest">Prefect</option>
            </select>
          </div>

         

          <button type="submit">Add User</button>
        </form>
      </div>
    );
  }
}

export default UserProfileForm;
