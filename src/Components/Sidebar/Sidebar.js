import React, { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const toggleSidebar = () => setShow(!show);

  return (
    <>
      {/* Top Navbar for small screens */}
      <Navbar bg="primary" variant="dark" expand="lg" className="d-lg-none">
        <Button variant="light" onClick={toggleSidebar} className="m-2">
          ☰ Menu
        </Button>
        <Navbar.Brand className="text-white">Admin Panel</Navbar.Brand>
      </Navbar>

      {/* Offcanvas Sidebar for small screens */}
      <Offcanvas show={show} onHide={toggleSidebar} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/details">Details</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Static Sidebar for large screens */}
      <div className="sidebar d-none d-lg-block">
        <h4 className="text-white text-center py-3">Admin Panel</h4>
        <Nav className="flex-column px-3">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <Nav.Link as={Link} to="/details">Details</Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
