import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/home">Students' <span className='text-success'>Corner</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto text-center">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/addStudent">Add Student</Nav.Link>
                        <Nav.Link as={Link} to="/allStudents">All students</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;