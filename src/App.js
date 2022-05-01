import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './components/start';
import Platform from './components/platform';
import './custom.css'

export default function App() {
  return (
    <Routes>
      <Route index element={<Start />} />
      <Route path='/platform/*' element={<Platform />} />
    </Routes>
  );
};