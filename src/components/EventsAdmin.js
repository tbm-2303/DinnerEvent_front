import React from 'react';
import {useState, useEffect} from "react"
import {Button, Col, Container, Row, Card, Table, Form} from "react-bootstrap";
import apiFacade from '../apiFacade';
import {Link} from "react-router-dom";

const EventsAdmin = () => {
  const [events, setEvents] = useState([]); // get all events


  useEffect(() => {
    apiFacade.getAllEvents().then(events => setEvents(events));
  }, [])

  const handleDelete = (e) => {
    e.preventDefault();
    const eventID = e.target.id;
    apiFacade.deleteEvent(eventID).then(() => {
      console.log(eventID);
      alert("Event deleted");
    })
    
    const newEvents = events.filter((event) => event.id != eventID);
    setEvents(newEvents);

  }


  return (
    <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
      <Row>
        <Col>
          <h2 className="text-center">Events</h2>
          <Table  striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Time</th>
                <th>Location</th>
                <th>Dish</th>
                <th>Price pr. person</th>
                <th>Assignments </th>
                <th>Delete</th>
                 
                  
                </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.time}</td>
                  <td>{event.location}</td>
                  <td>{event.dish}</td>
                  <td>{event.price}</td>
                  <td>  
                    <Link to={`/eventInfo/${event.id}`}
                      key={event.id}>See more event info and assignments for this event
                    </Link></td>
                  <td><Button onClick={(e) => handleDelete(e) } id={event.id} variant="danger">Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default EventsAdmin;
