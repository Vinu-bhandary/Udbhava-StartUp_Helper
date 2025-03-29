import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ValidatorMode from './pages/ValidatorMode';
import RiskMode from './pages/RiskMode';
import PlannerMode from './pages/PlannerMode';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      {/* Navbar will be shown on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/validator" element={<ValidatorMode />} />
        <Route path="/risk" element={<RiskMode />} />
        <Route path="/planner" element={<PlannerMode />} />
        
      </Routes>

      {/* Optional: Footer displayed on every page */}
      <Footer />
    </Router>
  );
}

export default App;
