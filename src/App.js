import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Roulette from './Roulette';
import Checkout from './Checkout';

function App() {
  return (
    <div style={{ backgroundColor: '#fff9d9', minHeight: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;