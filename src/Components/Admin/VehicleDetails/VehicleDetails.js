import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import Navbar from '../../Sidebar/Navbar';

const VehicleDetails = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div style={{ marginTop: '60px' }}>
      {/* Top Navbar */}
      <Navbar
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className="vehicle-page-content"
        style={{
          marginLeft: sidebarCollapsed ? '100px' : '220px',
          padding: '2rem',
          transition: 'margin-left 0.3s ease',
          maxWidth: '1200px'
        }}
      >
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="text-center mb-4">🚗 Vehicle Details Form</h2>

            <Form>
              <h5 className="text-primary mb-3 mt-4">🔧 Car Details</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="makeBrand">
                    <Form.Label>Make/Brand</Form.Label>
                    <Form.Control type="text" placeholder="e.g., Toyota" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="e.g., Corolla" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="variant">
                    <Form.Label>Variant</Form.Label>
                    <Form.Control type="text" placeholder="e.g., VXi" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="year">
                    <Form.Label>Year of Manufacture</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="regNo">
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="fuelType">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select>
                      <option>Petrol</option>
                      <option>Diesel</option>
                      <option>CNG</option>
                      <option>Electric</option>
                      <option>Hybrid</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="transmission">
                    <Form.Label>Transmission Type</Form.Label>
                    <Form.Select>
                      <option>Manual</option>
                      <option>Automatic</option>
                      <option>CVT</option>
                      <option>AMT</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="mileage">
                    <Form.Label>Mileage (km)</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="color">
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="engineCapacity">
                    <Form.Label>Engine Capacity (cc)</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="image1">
                    <Form.Label>Image 1</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="image2">
                    <Form.Label>Image 2</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
              </Row>

              <h5 className="text-primary mb-3 mt-4">📝 Ownership & Legal Info</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="previousOwners">
                    <Form.Label>Previous Owners</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="rcAvailable">
                    <Form.Label>RC Available</Form.Label>
                    <Form.Select>
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="insuranceType">
                    <Form.Label>Insurance Type</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="insuranceValidity">
                    <Form.Label>Insurance Validity</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="pollutionValidity">
                    <Form.Label>Pollution Cert Validity</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="loanClearance">
                    <Form.Label>Loan Clearance Cert</Form.Label>
                    <Form.Select>
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="vin">
                    <Form.Label>VIN / Chassis Number</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="serviceHistory">
                    <Form.Label>Service History</Form.Label>
                    <Form.Control as="textarea" rows={1} placeholder="Optional" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="roadTax">
                    <Form.Label>Road Tax Paid</Form.Label>
                    <Form.Select>
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center">
                <Button variant="primary" type="submit" className="mt-4 px-5">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>

      {/* Responsive Style Fix */}
      <style>{`
        @media (max-width: 768px) {
          .vehicle-page-content {
            margin-left: 0 !important;
            padding: 1rem !important;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default VehicleDetails;
