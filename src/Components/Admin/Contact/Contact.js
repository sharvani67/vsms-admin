import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiSearch, FiX, FiSave } from 'react-icons/fi';
import axios from 'axios';
import Navbar from '../../Sidebar/Navbar';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  // Configure API base URL - adjust this to your actual API endpoint
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/contacts`);
        setContacts(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/contacts/${id}`);
      setContacts(contacts.filter((c) => c.id !== id));
      setError('');
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError(error.response?.data?.message || error.message || 'Failed to delete contact');
    }
  };

  const handleEditClick = (contact) => {
    setCurrentContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone || '',
      email: contact.email,
      message: contact.message
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/contacts/${currentContact.id}`,
        formData
      );
      setContacts(contacts.map(c => c.id === currentContact.id ? response.data : c));
      setShowEditModal(false);
      setError('');
    } catch (error) {
      console.error('Error updating contact:', error);
      setError(error.response?.data?.message || error.message || 'Failed to update contact');
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div style={{ marginTop: '60px' }}>
      <Navbar
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className="contact-table-content"
        style={{
          marginLeft: sidebarCollapsed ? '100px' : '220px',
          padding: '2rem',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="text-center mb-4">📞 Contact Messages</h2>

            <div className="mb-3 d-flex justify-content-between align-items-center">
              <div className="position-relative" style={{ width: '300px' }}>
                <FiSearch className="position-absolute" style={{ top: '10px', left: '10px', color: '#6c757d' }} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="form-control ps-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading && (
              <div className="text-center">
                <Spinner animation="border" />
                <p className="mt-2">Loading contacts...</p>
              </div>
            )}

            {error && (
              <Alert variant="danger" className="text-center" onClose={() => setError('')} dismissible>
                {error}
              </Alert>
            )}

            {!loading && !error && (
              <>
                <div className="table-responsive">
                  <Table bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>SNO</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {currentContacts.length > 0 ? (
                        currentContacts.map((contact, index) => (
                          <tr key={contact.id}>
                            <td>{indexOfFirst + index + 1}</td>
                            <td>{contact.name}</td>
                            <td>{contact.phone || '-'}</td>
                            <td>{contact.email}</td>
                            <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {contact.message}
                            </td>
                            <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                            {/* <td>
                              <Button 
                                variant="outline-primary" 
                                size="sm" 
                                className="me-2"
                                onClick={() => handleEditClick(contact)}
                              >
                                <FiEdit2 />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleDelete(contact.id)}
                              >
                                <FiTrash2 />
                              </Button>
                            </td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            No contacts found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                {filteredContacts.length > contactsPerPage && (
                  <div className="d-flex justify-content-center mt-3">
                    <nav>
                      <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          >
                            Previous
                          </button>
                        </li>
                        
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <li 
                              key={pageNum} 
                              className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
                            >
                              <button 
                                className="page-link" 
                                onClick={() => setCurrentPage(pageNum)}
                              >
                                {pageNum}
                              </button>
                            </li>
                          );
                        })}
                        
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Edit Contact Modal */}
      {/* <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              <FiX className="me-1" /> Cancel
            </Button>
            <Button variant="primary" type="submit">
              <FiSave className="me-1" /> Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal> */}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .contact-table-content {
            margin-left: 0 !important;
            padding: 1rem !important;
          }
          
          .table-responsive {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          
          .pagination {
            flex-wrap: wrap;
          }
          
          .page-item {
            margin-bottom: 5px;
          }
        }
        
        @media (max-width: 576px) {
          .d-flex.justify-content-between {
            flex-direction: column;
          }
          
          .position-relative {
            width: 100% !important;
            margin-bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;