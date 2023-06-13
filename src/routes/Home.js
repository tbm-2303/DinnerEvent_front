import { useState, useEffect } from "react";
import {Button, Col, Container, Row, Card, Table} from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './t.css'
import apifacade from "../apiFacade";

const Home = ({user}) => {
  const [allTrips, setAllTrips] = useState([]); // get all trips 
  const [pageUser , setPageUser] = useState({}); // get the pageUser of the logged in user

  useEffect(() => {
    apifacade.getAllTrips().then(trips => setAllTrips(trips));
    apifacade.getPageUserByUsername(user.username).then(pageUser => setPageUser(pageUser));
  }, []);


  // should only join if not already joined
  const handleJoin = (e) => {
    e.preventDefault();
    const tripId = e.target.id;
    if (allTrips.find(trip => trip.id == tripId).pageUsers.find(u => u.username == user.username)) {
      notify_error(tripId);
      return;
    }
    apifacade.joinTrip(user.username, tripId).then((data) => {
      console.log(data);
      notify_success(tripId);
    });

    // need to add the PageUser to the trip
    const newTrips = allTrips.map((trip) => {
      if (trip.id == tripId) {
        trip.pageUsers.push(pageUser);
      }
      return trip;
    });
    setAllTrips(newTrips);
  }


  const notify_error = (trip_id) =>
    toast.error(`You already joined trip nr.${trip_id}!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  const notify_success = (trip_id) => 
  toast.success(`You just added trip nr.${trip_id} to your list of joined trips!`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  return (
      <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
        <Row>
          <Col xs={2}></Col>
          <Col >
            <h2>Upcoming Trips</h2>
            
            <Table  striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Duration</th>
                  <th>Users</th>
                  <th>Guide</th>
                  <th>Join</th>
                </tr>
              </thead>
              <tbody>
                {allTrips.map((trip) => (
                  <tr key={trip.id}>
                    <td>{trip.id}</td>
                    <td>{trip.name}</td>
                    <td>{trip.date}</td>
                    <td>{trip.time}</td>
                    <td>{trip.location}</td>
                    <td>{trip.duration}</td>
                    <td>
                      <ul>
                        {trip.pageUsers.map((u) => (
                          <li key={u.id}>{u.username}</li>
                        ))}
                      </ul>
                    </td>
                    <td> 
                      <Link to={`/guideinfo/${trip.guideDTO.id}`}
                          key={trip.guideDTO.id}>Guide info
                      </Link>
                    </td>
                    <td><Button  onClick={(e) => handleJoin(e)} id={trip.id} >Join</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col xs={2}></Col>
        </Row>  
    
      </Container>
    ) 
}

export default Home
