import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar'; // adjust path if needed


const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '100px' }}>
        {/* Top Navbar */}
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow">
          <Container fluid>
            <Navbar.Brand>Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="#">Profile</Nav.Link>
                <Nav.Link href="#">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Dashboard Content */}
        <Container fluid>
          <h2 className="mb-4 text-center">Welcome, Admin!</h2>
          <Row className="g-4">
            <Col xs={12} md={6} lg={3}>
              <Card className="text-white bg-success shadow-sm">
                <Card.Body>
                  <Card.Title>Total Users</Card.Title>
                  <Card.Text style={{ fontSize: '24px' }}>1,245</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="text-white bg-info shadow-sm">
                <Card.Body>
                  <Card.Title>Active Sessions</Card.Title>
                  <Card.Text style={{ fontSize: '24px' }}>75</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="text-white bg-warning shadow-sm">
                <Card.Body>
                  <Card.Title>New Signups</Card.Title>
                  <Card.Text style={{ fontSize: '24px' }}>93</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="text-white bg-danger shadow-sm">
                <Card.Body>
                  <Card.Title>Revenue</Card.Title>
                  <Card.Text style={{ fontSize: '24px' }}>₹48,000</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Section Placeholder */}
          <Row className="mt-5">
            <Col>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Recent Activity</Card.Title>
                  <Card.Text>No recent activity. Stay tuned!</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
