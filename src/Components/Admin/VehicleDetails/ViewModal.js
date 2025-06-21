// ViewModal.js
import React from 'react';
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';
import baseURL from '../../../Baseurl/BaseUrl';

const ViewModal = ({ show, onHide, vehicle }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Vehicle Details - {vehicle.make_brand} {vehicle.model}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-primary mb-3">🔧 Car Details</h5>
        <Row className="mb-2">
          <Col md={6}><strong>Make/Brand:</strong> {vehicle.make_brand}</Col>
          <Col md={6}><strong>Model:</strong> {vehicle.model}</Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}><strong>Variant:</strong> {vehicle.variant}</Col>
          <Col md={6}><strong>Year:</strong> {vehicle.year_of_manufacture}</Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}><strong>Registration No:</strong> {vehicle.registration_number}</Col>
          <Col md={6}><strong>Fuel Type:</strong> {vehicle.fuel_type}</Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}><strong>Transmission:</strong> {vehicle.transmission_type}</Col>
          <Col md={6}><strong>Mileage:</strong> {vehicle.mileage} km</Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}><strong>Color:</strong> {vehicle.color}</Col>
          <Col md={6}><strong>Engine Capacity:</strong> {vehicle.engine_capacity} cc</Col>
        </Row>

        <h5 className="text-primary mt-4 mb-3">📝 Ownership & Legal Info</h5>
        <Row className="mb-2">
          <Col md={6}><strong>Previous Owners:</strong> {vehicle.previous_owners}</Col>
          <Col md={6}><strong>RC Available:</strong> {vehicle.rc_available}</Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}><strong>Insurance Type:</strong> {vehicle.insurance_type}</Col>
          <Col md={6}><strong>Insurance Validity:</strong> {vehicle.insurance_validity}</Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}><strong>Pollution Cert Validity:</strong> {vehicle.pollution_validity}</Col>
          <Col md={6}><strong>Loan Clearance Cert:</strong> {vehicle.loan_clearance_cert}</Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}><strong>VIN/Chassis No:</strong> {vehicle.vin}</Col>
          <Col md={6}><strong>Service History:</strong> {vehicle.service_history}</Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}><strong>Road Tax Paid:</strong> {vehicle.road_tax_paid}</Col>
        </Row>

        <h5 className="text-primary mt-4 mb-3">🖼 Vehicle Images</h5>
        <Row>
          <Col md={6} className="mb-3">
            <strong>Image 1:</strong><br />
            {vehicle.image1 && (
              <Image
                src={`${baseURL.replace('/api', '')}/uploads/${vehicle.image1}`}
                thumbnail
                fluid
                alt="Vehicle Image 1"
              />
            )}
          </Col>
          <Col md={6} className="mb-3">
            <strong>Image 2:</strong><br />
            {vehicle.image2 && (
              <Image
                src={`${baseURL.replace('/api', '')}/uploads/${vehicle.image2}`}
                thumbnail
                fluid
                alt="Vehicle Image 2"
              />
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
