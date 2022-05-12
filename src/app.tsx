import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.style.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div />} />
      </Routes>
    </BrowserRouter>
  );
};
