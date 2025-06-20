import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Login from './Components/Admin/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from './Components/Admin/Gallery/Gallery';
import Contact from './Components/Admin/Contact/Contact';
import VehicleDetails from './Components/Admin/VehicleDetails/VehicleDetails';
import GalleryTable from './Components/Admin/Gallery/GalleryTable';



const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/" element={<Login/>} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details" element={<VehicleDetails />} />
          <Route path="/gallery-table" element={<GalleryTable />} />
      </Routes>
    </Router>
  );
};

export default App;
