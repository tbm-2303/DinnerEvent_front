import React from 'react';
import { useState, useEffect } from "react"
import facade from "../apiFacade"
import { Container, Row, Col, Card } from 'react-bootstrap';



const Userpage = ({user}) => {
  const [member, setMember] = useState([]); 

  useEffect(() => {
    facade.getMemberByUsername(user.username).then(member => setMember(member));
  }, []);




  return (

    <div>
      <Row>
        <Col></Col>
        <Col>  
          <h1>Guideinfo</h1>
          <Card>
            <Card.Body>
              <Card.Title>Member info</Card.Title>
              <Card.Text>
                Name: {member.username}
                <br/>
                Email: {member.email}
                <br/>
                Birthyear: {member.birthYear}
                <br/>
                Balance: {member.account}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>

    </div>

  );
}

export default Userpage;
