import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Modal = (props) => {
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = () => {
        // Handle the submitted input value here (e.g., send it to a server)
        console.log('Submitted value:', inputValue);
        handleClose();
      };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter something:</Form.Label>
            <Form.Control
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

export default Modal