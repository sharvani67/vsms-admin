import React, { useState } from 'react';
import Navbar from '../../Sidebar/Navbar';

const Contact = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="contact-wrapper">
      {/* Top Navbar */}
      <Navbar
        collapsed={sidebarCollapsed}
        onToggleSidebar={(collapsed) => setSidebarCollapsed(collapsed)}
      />

      {/* Main Content */}
      <div className={`contact-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <h2>📞 Contact Page</h2>
        <p>This is the contact page content. You can place a contact form or details here.</p>
      </div>

      {/* Embedded Responsive Styles */}
      <style>{`
        .contact-wrapper {
          margin-top: 60px;
        }

        .contact-content {
          margin-left: 220px;
          padding: 2rem;
          transition: margin-left 0.3s ease;
        }

        .contact-content.collapsed {
          margin-left: 100px;
        }

        @media (max-width: 767px) {
          .contact-content {
            margin-left: 0 !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
