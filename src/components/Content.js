import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../routes/Home";
import Navbar from "../navbar/Navbar";
import LoginForm from "../components/LoginForm";

import { ToastContainer, toast } from 'react-toastify';
import Frontpage from './Frontpage';
import Events from './Events';
import CreateEvent from './CreateEvent';
import MyEvents from './MyEvents';
import EventsAdmin from './EventsAdmin';
import EventInfo from './EventInfo';
import AssignmentInfo from './AssignmentInfo';
import Userpage from './Userpage';



const Content = ({ loggedIn,login,user,logout}) => {
    return (
        <Router>
            <Navbar user={user} loggedIn={loggedIn} login={login} logout={logout}/>
            <ToastContainer 
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
            <Routes>
              <Route path="/" element={<Frontpage user={user}/>}/>
              <Route path="/events" element={<Events/>}/>
              <Route path="/login" element={<LoginForm login={login}/>}/>
              <Route path="/createEvent" element={<CreateEvent/>}/>
              <Route path="/myEvents" element={<MyEvents user={user}/>}/>
              <Route path="/eventsAdmin" element={<EventsAdmin/>}/>
              <Route path="/eventInfo/:eventId" element={<EventInfo/>}/>
              <Route path="/assignmentInfo/:assignmentId" element={<AssignmentInfo/>}/>
              <Route path="/userpage" element={<Userpage user={user}/>}/>
              
              
              
              
            </Routes>
           
        </Router>
        
  )
}

export default Content
