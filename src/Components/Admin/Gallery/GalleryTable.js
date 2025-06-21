import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../../Baseurl/BaseUrl';
import Navbar from '../../Sidebar/Navbar';

const GalleryTable = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${baseURL}/gallery`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Failed to fetch gallery items');

        setGalleryItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div style={{ marginTop: '60px' }}>
      {/* Top Navbar */}
      <Navbar
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className="gallery-table-content"
        style={{
          marginLeft: sidebarCollapsed ? '100px' : '220px',
          padding: '2rem',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Card className="shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">📸 Gallery Items</h2>
              <Button variant="primary" onClick={() => navigate('/gallery')}>
                Add New
              </Button>
            </div>

            {loading && (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            )}

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            {!loading && !error && (
              <Table bordered responsive hover>
                <thead className="table-dark text-center">
                  <tr>
                    <th>S.No</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Preview</th>
                    <th>Uploaded On</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {galleryItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.type}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>
                        {item.file ? (
                          item.type === 'image' ? (
                            <img
                              src={`${baseURL.replace('/api', '')}/uploads/${item.file}`}
                              alt={item.name}
                              style={{ width: '100px', height: 'auto', borderRadius: '6px' }}
                            />
                          ) : (
                            <video controls width="150" style={{ borderRadius: '6px' }}>
                              <source
                                src={`${baseURL.replace('/api', '')}/uploads/${item.file}`}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          )
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td>{new Date(item.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Responsive Sidebar Fix */}
      <style>{`
        @media (max-width: 768px) {
          .gallery-table-content {
            margin-left: 0 !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryTable;
