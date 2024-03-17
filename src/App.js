import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Home';
import RouletteApp from './Roulette'; // ルーレット画面のコンポーネントをimport

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/roulette" element={<RouletteApp />} />
      </Routes>
    </Router>
  );
}

export default App;