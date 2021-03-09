import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Nav, NavItem, 
        NavbarBrand, Container} from 'reactstrap';

const heading = () => {
    return (
 <Navbar>
     <Container>
         <NavbarBrand>
             <Nav>
                 <NavItem>
                     <link></link>
                 </NavItem>
             </Nav>
         </NavbarBrand>
     </Container>
 </Navbar>
    )
}

export default heading
