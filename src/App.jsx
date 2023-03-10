import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register, ContentTypes, NotFound, Login, ContentTypeBuilder } from './pages';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/content-types/:id" element={
            <ProtectedRoute redirect={'/login'} element={<ContentTypes/>}/>
          } />
          <Route path="/content-types" element={
            <ProtectedRoute element={<ContentTypeBuilder/>} redirect={'/login'}/>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
