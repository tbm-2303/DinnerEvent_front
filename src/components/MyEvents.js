import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import apifacade from "../apiFacade";
import { Container, Row, Col, Table } from 'react-bootstrap';

const MyEvents = ({user}) => {
  const [myAssignments, setMyAssignments] = useState([]); // get my events

  useEffect(() => {
    apifacade.getMyAssignments(user.username).then(assignments => setMyAssignments(assignments));
  }, []);





  return (
    <div>
    
      <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
        <Row>
          <Col>
            <h2 className="text-center">My Assignments/Transactions</h2>
            <Table  striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Family name</th>
                  <th>Created</th>
                  <th>Contact info</th>
                  <th>Event id</th>
                  <th>Members</th>
                 
          
                </tr>
              </thead>
              <tbody>
                {myAssignments && myAssignments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.familyName}</td>
                    <td>{a.created}</td>
                    <td>{a.contactInfo}</td>
                    <td>{a.event.id}</td>
                    <td>
                      <ul>
                        {a.members.map((m) => (
                          <li key={m.id}>{m.username}</li>
                        ))}
                      </ul>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
    </Container>

      
    </div>
  );
}

export default MyEvents;

