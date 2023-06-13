import React from 'react';
import {useState, useEffect} from "react"
import {Button, Col, Container, Row, Card, Table, Form} from "react-bootstrap";
import apiFacade from '../apiFacade';
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";



const EventInfo = () => {
  const [eventInfo, setEventInfo] = useState([]); // get all events
  const { eventId } = useParams();
  const [assignments, setAssignments] = useState([]); // get Assignments from event
  const [event, setEvent] = useState({}) // event for editing
  
  useEffect(() => {
    apiFacade.getAssignmentsByEventId(eventId).then(assignments => setAssignments(assignments));
    apiFacade.getEventById(eventId).then(event => setEvent(event));
  }, [])



  const  handleChangeEvent= (e) => {
    const target = e.target
    const id = target.id
    const value = target.value
    setEvent({...event, [id]: value})
  }

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    apiFacade.updateEvent(event).then((data) => {
      console.log(data);
      alert("Event updated");
    })
  }

    



  return (
    <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
      <Row>
        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5">
          <h2 className="text-center">Event nr.{eventId}</h2>
          <h3>Assignments:</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>FamilyName</th>
                <th>Created</th>
                <th>Contact Info</th>
                <th>Assignment info</th>
               
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.id}</td>
                  <td>{assignment.familyName}</td>
                  <td>{assignment.created}</td>
                  <td>{assignment.contactInfo}</td>
                  <td>
                    <Link to={`/assignmentInfo/${assignment.id}`}
                      key={assignment.id}>See More info about Assignment and members
                    </Link>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5">
          <h2>Edit Event data:</h2>
          <Form onChange={handleChangeEvent} onSubmit={handleSubmitEvent}>
            <Form.Group className="" controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control required type="time" value={event.time} placeholder="Enter time" />
            </Form.Group>
            <Form.Group className="" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control required type="text" value={event.location} placeholder="Enter location" />
            </Form.Group>
            <Form.Group className="" controlId="dish">
              <Form.Label>Dish</Form.Label>
              <Form.Control required type="text" value={event.dish} placeholder="Enter dish" />
            </Form.Group>
            <Form.Group className="" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control required type="text" value={event.price} placeholder="Enter price" />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              Edit Trip
            </Button>
          </Form>
        
        </Col>
      </Row>

    </Container>
  );
}

export default EventInfo;
