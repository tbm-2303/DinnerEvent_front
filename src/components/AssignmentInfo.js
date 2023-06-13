import React from 'react';
import {useState, useEffect} from "react"
import {Button, Col, Container, Row, Card, Table, Form} from "react-bootstrap";
import apiFacade from '../apiFacade';
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";


const AssignmentInfo = () => {

  const { assignmentId } = useParams();
  const [assignmentInfo, setAssignmentInfo] = useState([]); // get all assignment by id
  const [members, setMembers] = useState([]); // get all members from assignment

  useEffect(() => {
    apiFacade.getAssignmentById(assignmentId).then(assignmentInfo => setAssignmentInfo(assignmentInfo));
    apiFacade.getMembersFromAssignment(assignmentId).then(members => setMembers(members));
  }, [])


  const handleRemove = (e) => {
    e.preventDefault();
    const memberId = e.target.id;
    apiFacade.removeMemberFromAssignment(assignmentId, memberId);
    const newMembers = members.filter((member) => member.id != memberId);
    setMembers(newMembers);
  }


  return (
    <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
      <Row>
        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5">
          <h2 className="text-center">Assignment nr.{assignmentId}</h2>
          <h5>info:</h5>
          <ul>
            <li>FamilyName: {assignmentInfo.familyName}</li>
            <li>Created: {assignmentInfo.created}</li>
            <li>Contact Info: {assignmentInfo.contactInfo}</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5">
          <h2>Members</h2>
          <Table  striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Username</th>
                <th>BirthYear</th>
                <th>Balance</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {members &&
                members.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.address}</td>
                  <td>{member.phone}</td>
                  <td>{member.email}</td>
                  <td>{member.username}</td>
                  <td>{member.birthYear}</td>
                  <td>{member.account}</td>
                  <td><Button id={member.id} value={member.id} variant="danger" onClick={(e) => handleRemove(e)}>Remove</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

    </Container> 
     );
}

export default AssignmentInfo;

