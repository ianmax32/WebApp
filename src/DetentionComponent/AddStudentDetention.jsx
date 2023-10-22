import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddStudentDetention = (props) => {
    const [show, setShow] = useState(props.display);
    const [stDetention, setstDetention] = useState({
        "date": '',
        "reason": "",
        "studentName": ""
    });
  
    const handleClose = () => setShow(!show);
    const handleShow = () => setShow(show);
  
    const handleInputChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setstDetention((prevState) => ({
          ...prevState,
          [name]: value,
      }));
      console.log(stDetention)
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const requestOptions={
          method:'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(stDetention)
        }
      var response = fetch('http://localhost:8080/api/students/assignDetention',requestOptions)
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
      alert(`Detention has been added`,)
      setstDetention({
        "date": '',
        "reason": '',
        "studentName": ''
      })
      window.location.reload(true)
      console.log(response);
        handleClose();
      };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Assign Student to Detention</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Student:</Form.Label>
            <select
                name="studentName"
                required
                value={stDetention.studentName}
                onChange={handleInputChange}
                className='form-control text-dark'>
                <option value="default">
                    Select a Student
                </option>
                {props.studentList.map((student) => (
                    <option key={student.id} value={student.name}>
                    {student.name}
                    </option>
                ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Detention date:</Form.Label>
            <select
                name="date"
                required
                value={stDetention.date}
                onChange={handleInputChange}
                className='form-control text-dark'>
                <option value="default">
                    Select Detention
                </option>
                {props.detentionList.map((detention) => (
                    <option key={detention.Id} value={detention.date}>
                    {detention.date}
                    </option>
                ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Reason:</Form.Label>
            <Form.Control
              name="reason"
              type="text"
              required
              value={stDetention.reason}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Appoint Detention
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

export default AddStudentDetention