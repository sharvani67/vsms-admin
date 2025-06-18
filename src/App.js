import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Login from './Components/Admin/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
};

export default App;
