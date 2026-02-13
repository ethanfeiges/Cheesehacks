import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Registration from './components/Registration';
import Teams from './components/Teams';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-cheese-yellow selection:text-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
