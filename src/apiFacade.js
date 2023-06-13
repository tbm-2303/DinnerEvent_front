const URL = "http://localhost:8080/DinnerEvent_war_exploded";

function handleHttpErrors(res) {
  if (!res.ok) {
  console.log(res.status)
  return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}


function apiFacade() {

const login = (user, password) => {    
    const options = makeOptions("POST", true,{username: user, password: password });
    return fetch(URL + "/api/login", options).then(handleHttpErrors).then(res => {setToken(res.token)})
}

const fetchData = (ressource) => { 
    const options = makeOptions("GET",true, null); //True add's the token
    return fetch(URL + ressource, options).then(handleHttpErrors);
}

const makeOptions= (method,addToken,body) => {
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn()) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
}


const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
}
const getToken = () => {
    return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}
const logout = () => {
    localStorage.removeItem("jwtToken");
}

function readJWTTokken(token) {
    console.log('TOKEN: ', token);
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}

const getAllEvents =  () => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/event/all`, options).then(r => r.json());
}

const getMyAssignments = (username) => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/assignment/getAllByUsername/${username}`, options).then(r => r.json());
}

const createEvent = (event) => {
  const options = makeOptions("POST", true, event);
  return fetch(URL + `/api/event/create`, options).then(r => r.json());
}

const deleteEvent = (eventId) => {
  const options = makeOptions("DELETE", true, null);
  return fetch(URL + `/api/event/delete/${eventId}`, options).then(r => r.json());
}

const getAssignmentsByEventId = (eventId) => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/assignment/getAllByEventId/${eventId}`, options).then(r => r.json());
}

const getAssignmentById = (assignmentId) => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/assignment/getById/${assignmentId}`, options).then(r => r.json());
}

const getMembersFromAssignment = (assignmentId) => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/assignment/getMembers/${assignmentId}`, options).then(r => r.json());
}

const removeMemberFromAssignment = (assignmentId, memberId) => {
  const options = makeOptions("PUT", true, null);
  return fetch(URL + `/api/assignment/removeMember/${assignmentId}/${memberId}`, options).then(r => r.json());
}


const updateEvent = (event) => {
  const options = makeOptions("PUT", true, event);
  return fetch(URL + `/api/event/update`, options).then(r => r.json());
}

const getEventById = (eventId) => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/event/getById/${eventId}`, options).then(r => r.json());
}

const getMemberByUsername = (username) => {
  const options = makeOptions("GET", true, null);
  return fetch(URL + `/api/member/get/${username}`, options).then(r => r.json());
}


 return {
  makeOptions,
  setToken,
  getToken,
  loggedIn,
  login,
  logout,
  fetchData,
  readJWTTokken,

  getAllEvents,
  getMyAssignments,
  createEvent,
  deleteEvent,
  getAssignmentsByEventId,
  getAssignmentById,
  getMembersFromAssignment,
  removeMemberFromAssignment,
  updateEvent,
  getEventById,
  getMemberByUsername,

 }
}

const facade = apiFacade();
export default facade;
