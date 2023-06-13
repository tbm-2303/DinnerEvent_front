import React from 'react'
import { PrimaryNav, MenuLink, Menu, Hamburger } from './NavElement'
import { useState, useEffect } from "react"
import facade from "../apiFacade"

const Navbar = ({user, loggedIn, logout}) => {

  const [balance, setBalance] = useState(0);
  
  let isAdmin = false;
  if(user.roles.includes("admin") ){
      isAdmin = true;
  }






  return (
    <>
      <PrimaryNav>
        <Hamburger/>
        <Menu>
          
          username: {user.username}

          {loggedIn && isAdmin &&
            <MenuLink to="/createEvent" ativestyle="true">
              Create Event
            </MenuLink>
          }

          {loggedIn && isAdmin &&
            
            <MenuLink to="/eventsAdmin" ativestyle="true">
                all Events admin
            </MenuLink>
          }

          
    
          
       
          

                      
          {loggedIn && !isAdmin &&
            <MenuLink to="/events" ativestyle="true">
              all Events
            </MenuLink>        
          }

          {loggedIn && !isAdmin &&
            <MenuLink to="/myEvents" ativestyle="true">
              My Transactions
            </MenuLink>
          }

          {loggedIn && !isAdmin &&
            <MenuLink to="/userpage" ativestyle="true">
              Userpage
            </MenuLink>
          }

          {loggedIn ? (<MenuLink to="/" ativestyle="true" onClick={logout}> Logout </MenuLink> ) : (<MenuLink to="/login" ativestyle="true"> Login </MenuLink>)}

        </Menu>
      </PrimaryNav>
    </>
  )
}
export default Navbar