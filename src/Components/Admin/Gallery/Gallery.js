import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import Navbar from '../../Sidebar/Navbar';

const Gallery = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [uploadType, setUploadType] = useState('image');
  const [error, setError] = useState('');

  // File size check: 2MB for image, 10MB for video
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = uploadType === 'image' ? 2 * 1024 * 1024 : 10 * 1024 * 1024; // 2MB or 10MB

    if (file.size > maxSize) {
      const typeText = uploadType === 'image' ? '2MB' : '10MB';
      setError(`❌ ${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} must be less than ${typeText}`);
      e.target.value = ''; // clear the file input
    } else {
      setError('');
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

            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            <Form>
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
                {uploadType === "image" && (
                  <>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="imageName">
                        <Form.Label>🖼 Image Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter image name" />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="imageUpload">
                        <Form.Label>📤 Upload Image</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group className="mb-3" controlId="imageDesc">
                        <Form.Label>📝 Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Write a description..." />
                      </Form.Group>
                    </Col>
                  </>
                )}

                {uploadType === "video" && (
                  <>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="videoName">
                        <Form.Label>🎬 Video Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter video name" />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="videoUpload">
                        <Form.Label>📤 Upload Video</Form.Label>
                        <Form.Control
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group className="mb-3" controlId="videoDesc">
                        <Form.Label>📝 Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Write a description..." />
                      </Form.Group>
                    </Col>
                  </>
                )}
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
