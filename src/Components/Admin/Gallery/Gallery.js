import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import Navbar from '../../Sidebar/Navbar';
import baseURL from '../../../Baseurl/BaseUrl';

const Gallery = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [uploadType, setUploadType] = useState('image');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null,
  });

  // Handle text and textarea input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle file change and size validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = uploadType === 'image' ? 2 * 1024 * 1024 : 10 * 1024 * 1024;

    if (file.size > maxSize) {
      const typeText = uploadType === 'image' ? '2MB' : '10MB';
      setError(`❌ ${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} must be less than ${typeText}`);
      e.target.value = '';
    } else {
      setError('');
      setFormData({ ...formData, file });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.file || !formData.name) {
      setError("Name and File are required.");
      return;
    }

    const payload = new FormData();
    payload.append('type', uploadType);
    payload.append('name', formData.name);
    payload.append('description', formData.description);
    payload.append('file', formData.file);

    try {
      const response = await fetch(`${baseURL}/gallery`, {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      setSuccess(` ${uploadType === 'image' ? 'Image' : 'Video'} uploaded successfully!`);
      setFormData({ name: '', description: '', file: null });
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
        className="gallery-page-content"
        style={{
          marginLeft: sidebarCollapsed ? '100px' : '220px',
          padding: '2rem',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="text-center mb-4">🎨 Gallery Upload</h2>

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            {success && <Alert variant="success" className="text-center">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>📁 Select Upload Type</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Image"
                    name="uploadType"
                    value="image"
                    checked={uploadType === "image"}
                    onChange={(e) => setUploadType(e.target.value)}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Video"
                    name="uploadType"
                    value="video"
                    checked={uploadType === "video"}
                    onChange={(e) => setUploadType(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>{uploadType === "image" ? "🖼 Image Name" : "🎬 Video Name"}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Enter ${uploadType} name`}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="file">
                    <Form.Label>📤 Upload {uploadType === "image" ? "Image" : "Video"}</Form.Label>
                    <Form.Control
                      type="file"
                      accept={uploadType === 'image' ? 'image/*' : 'video/*'}
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>📝 Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write a description..."
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Upload {uploadType === "image" ? "Image" : "Video"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>

      {/* Responsive Sidebar Fix */}
      <style>{`
        @media (max-width: 768px) {
          .gallery-page-content {
            margin-left: 0 !important;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
