import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register, ContentTypeBuilder, ContentTypes, NotFound, Login } from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/content-type-builder" element={<ContentTypeBuilder/>} />
          <Route path="/content-types" element={<ContentTypes/>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
