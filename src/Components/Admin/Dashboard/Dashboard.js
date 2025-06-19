import React, { useState } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../../Sidebar/Navbar';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="dashboard-wrapper">
      {/* Top Navbar */}
      <Navbar
        collapsed={sidebarCollapsed}
        onToggleSidebar={(collapsed) => setSidebarCollapsed(collapsed)}
      />

      {/* Main Content */}
      <div className={`dashboard-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
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
                  <Card.Title>Gallery</Card.Title>
                  <Card.Text style={{ fontSize: '24px' }}>75</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="text-white bg-warning shadow-sm">
                <Card.Body>
                  <Card.Title>Contact</Card.Title>
                  <Card.Text style={{ fontSize: '24px' }}>93</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="text-white bg-danger shadow-sm">
                <Card.Body>
                  <Card.Title>Vehicle Details</Card.Title>
                  <Card.Text style={{ fontSize: '24px' }}>24</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activity Section */}
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

      {/* Embedded Responsive Styles */}
      <style>{`
        .dashboard-wrapper {
          margin-top: 60px;
        }

        .dashboard-content {
          margin-left: 220px;
          padding: 2rem;
          transition: margin-left 0.3s ease;
        }

        .dashboard-content.collapsed {
          margin-left: 100px;
        }

        @media (max-width: 767px) {
          .dashboard-content {
            margin-left: 0 !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
