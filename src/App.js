import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './webpages/homepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
