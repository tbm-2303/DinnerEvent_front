import React from 'react';
import {useState, useEffect} from "react"
import {Button, Col, Container, Row, Card, Table, Form} from "react-bootstrap";
import apiFacade from '../apiFacade';



const CreateEvent = () => {
  const initialEvent = {time: "", location: "", dish: "", price: "" }
  const [event, setEvent] = useState(initialEvent);


const handleCreate = (e) => {
  e.preventDefault();
  apiFacade.createEvent(event).then((data) => {
    console.log(data);
    alert("Event created");
  })
  setEvent(initialEvent);
}





  return (
    <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
      <Row>
        <Col>
          <h2 className="text-center">Create Event</h2>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control 
                type="time" 
                placeholder="Enter time" 
                value={event.time}
                onChange={(e) => setEvent({...event, time: e.target.value}) }
                required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={event.location}
                onChange={(e) => setEvent({...event, location: e.target.value}) }
                required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dish">
              <Form.Label>Dish</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter dish"
                value={event.dish}
                onChange={(e) => setEvent({...event, dish: e.target.value}) }
                required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={event.price}
                onChange={(e) => setEvent({...event, price: e.target.value}) }
                required/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>


          </Form>

        </Col>
      </Row>
    </Container>
  );
}

export default CreateEvent;
