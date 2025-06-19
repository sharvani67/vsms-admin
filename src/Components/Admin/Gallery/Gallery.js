import React, { useState } from "react";
import Navbar from '../../Sidebar/Navbar';

const Gallery = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div style={{ marginTop: '60px' }}>
      

<Navbar 
  collapsed={sidebarCollapsed}
  onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
/>
      <div 
        style={{ 
          marginLeft: '220px', // Matches the default sidebar width
          padding: '2rem',
          transition: 'margin-left 0.3s ease' // Smooth transition when sidebar collapses
        }}
        className="page-content" // Added class for responsive adjustments
      >
        <h2>Gallery Page</h2>
        {/* Your gallery content goes here */}
      </div>
    </div>
  );
};

export default Gallery;