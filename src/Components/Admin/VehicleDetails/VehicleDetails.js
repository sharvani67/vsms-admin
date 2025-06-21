import React, { useState } from 'react';
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Navbar from '../../Sidebar/Navbar';
import baseURL from '../../../Baseurl/BaseUrl';

const VehicleDetails = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [formData, setFormData] = useState({});
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();

    // Append all form fields
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    // Append images
    if (image1) data.append('image1', image1);
    if (image2) data.append('image2', image2);

    try {
      const response = await fetch(`${baseURL}/vehicles`, {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong');

      setSuccess('✅ Vehicle added successfully!');
      setFormData({});
      setImage1(null);
      setImage2(null);
    } catch (err) {
      setError(`❌ ${err.message}`);
    }
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <Navbar
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

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

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            {success && <Alert variant="success" className="text-center">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Car Details Section */}
              <h5 className="text-primary mb-3 mt-4">🔧 Car Details</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="make_brand">
                    <Form.Label>Make/Brand</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="variant">
                    <Form.Label>Variant</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="year_of_manufacture">
                    <Form.Label>Year of Manufacture</Form.Label>
                    <Form.Control type="number" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="registration_number">
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="fuel_type">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select onChange={handleChange}>
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
                  <Form.Group controlId="transmission_type">
                    <Form.Label>Transmission Type</Form.Label>
                    <Form.Select onChange={handleChange}>
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
                    <Form.Control type="number" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="color">
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="engine_capacity">
                    <Form.Label>Engine Capacity (cc)</Form.Label>
                    <Form.Control type="number" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="image1">
                    <Form.Label>Image 1</Form.Label>
                    <Form.Control type="file" onChange={(e) => setImage1(e.target.files[0])} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="image2">
                    <Form.Label>Image 2</Form.Label>
                    <Form.Control type="file" onChange={(e) => setImage2(e.target.files[0])} />
                  </Form.Group>
                </Col>
              </Row>

              {/* Ownership & Legal Info */}
              <h5 className="text-primary mb-3 mt-4">📝 Ownership & Legal Info</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="previous_owners">
                    <Form.Label>Previous Owners</Form.Label>
                    <Form.Control type="number" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="rc_available">
                    <Form.Label>RC Available</Form.Label>
                    <Form.Select onChange={handleChange}>
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="insurance_type">
                    <Form.Label>Insurance Type</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="insurance_validity">
                    <Form.Label>Insurance Validity</Form.Label>
                    <Form.Control type="date" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="pollution_validity">
                    <Form.Label>Pollution Cert Validity</Form.Label>
                    <Form.Control type="date" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="loan_clearance_cert">
                    <Form.Label>Loan Clearance Cert</Form.Label>
                    <Form.Select onChange={handleChange}>
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
                    <Form.Control type="text" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="service_history">
                    <Form.Label>Service History</Form.Label>
                    <Form.Control as="textarea" rows={1} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="road_tax_paid">
                    <Form.Label>Road Tax Paid</Form.Label>
                    <Form.Select onChange={handleChange}>
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

      {/* Responsive Fix */}
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
