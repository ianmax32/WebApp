import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddDetention = (props) => {
    const [show, setShow] = useState(props.display);
    const [detention, setDetention] = useState({
      'date': '',
      'endTime': '',
      'roomNumber': 0,
      'startTime': '',
      'teacherName': ''
    });
  
    const handleClose = () => setShow(!show);
    const handleShow = () => setShow(show);
  
    const handleInputChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setDetention((prevState) => ({
          ...prevState,
          [name]: value,
      }));
      console.log(detention)
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const requestOptions={
          method:'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(detention)
        }
      var response = fetch('http://localhost:8080/api/detention/addDetention',requestOptions)
      .then(a => {
        return a.json();
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
      alert(`Detention has been added`,)
      window.location.reload(true)
      // setDetention({
      //   "date": "",
      //   "endTime": "",
      //   "roomNumber": 0,
      //   "startTime": "",
      //   "teacherName": ""
      // })
      console.log(response);
        handleClose();
      };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Detention</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control
              name='date'
              type="date"
              value={detention.date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Time:</Form.Label>
            <select
                name="startTime"
                required
                value={detention.startTime}
                onChange={handleInputChange}
                className='form-control text-dark'>
                <option value="default">
                    Select a Start Time
                </option>
                <option value="12:00">12:00</option>
                <option value="12:00">13:00</option>
                <option value="12:00">14:00</option>
              </select>
          </Form.Group>
          <Form.Group>
            <Form.Label>End Time:</Form.Label>
            <select
                name="endTime"
                required
                value={detention.endTime}
                onChange={handleInputChange}
                className='form-control text-dark'>
                <option value="default">
                    Select a End Time
                </option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Teacher:</Form.Label>
            <select
                name="teacherName"
                required
                value={detention.teacherName}
                onChange={handleInputChange}
                className='form-control text-dark'>
                <option value="default">
                    Select a Teacher
                </option>
                {props.teacherList.map((teacher) => (
                    <option key={teacher.id} value={teacher.name}>
                    {teacher.name}
                    </option>
                ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Room:</Form.Label>
            <select
                name="roomNumber"
                required
                value={detention.roomNumber}
                onChange={handleInputChange}
                className='form-control text-dark'>
                <option value="default">
                    Select a Room
                </option>
                {props.roomList.map((room) => (
                    <option key={room.roomId} value={room.roomId}>
                    {room.location}
                    </option>
                ))}
            </select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Detention
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

export default AddDetention