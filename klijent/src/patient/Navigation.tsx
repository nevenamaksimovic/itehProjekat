
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sidenav, Nav, Button } from 'rsuite'
import { User } from '../types'
interface Props {
  user: User,
  onLogout: () => void
}

export default function Navigation(props: Props) {
  return (
    <Sidenav className='navigation'>
      <Sidenav.Header className='header'>
        Hello {props.user.firstName + ' ' + props.user.lastName}
      </Sidenav.Header>
      <Sidenav.Body>
        <Nav className='navBody'>
          <Nav.Item
            as={NavLink}
            to='/'
          >
            Home page
          </Nav.Item>
          <Nav.Item
            as={NavLink}
            to='/services'
          >
            Services
          </Nav.Item>
          <Nav.Item
            as={NavLink}
            to='/schedule'
          >
            Schedule intervention
          </Nav.Item>
          <Nav.Item
            as={NavLink}
            to='/history'
          >
            History
          </Nav.Item>
          <Nav.Item>
            <Button
              onClick={props.onLogout}
              appearance='primary'
              color='cyan'
            >Logout</Button>
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  )
}
