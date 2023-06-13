import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import apifacade from "../apiFacade";
import { Container, Row, Col, Table } from 'react-bootstrap';


const Events = () => {
  const [allEvents, setAllEvents] = useState([]); // get all events


  useEffect(() => {
    apifacade.getAllEvents().then(events => setAllEvents(events));
  }, []);


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
                  
                 
                  
                </tr>
              </thead>
              <tbody>
                {allEvents.map((trip) => (
                  <tr key={trip.id}>
                    <td>{trip.id}</td>
                    <td>{trip.time}</td>
                    <td>{trip.location}</td>
                    <td>{trip.dish}</td>
                    <td>{trip.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
    </Container>
  );
}

export default Events;
