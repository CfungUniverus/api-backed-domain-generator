import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ObjectFieldInfoForm from './ObjectFieldInfoForm'; 
import ObjectInfoForm from './ObjectInfoForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/field" element={<ObjectFieldInfoForm />} />
        <Route path="/" element={<ObjectInfoForm />} />
      </Routes>
    </Router>
  );
}

export default App;
