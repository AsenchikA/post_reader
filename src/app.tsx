import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/login';
import { Posts } from './pages/posts/posts';
import './styles/global.style.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:userId" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
};
