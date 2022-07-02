import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from "./components/Header";
import HomePage from "./components/Home";
import SignupPage from './components/Signup';
import LoginPage from './components/Login';
import Reservations from './components/Reservations';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import './style/style.css'

const App = () => {
  console.log('here')
  return (
    <BrowserRouter basename=''>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage/>} />      
          <Route path="/login" element={<LoginPage/>} />      
          <Route path="/signup" element={<SignupPage/>} />    
          <Route path="/reservations" element={<Reservations/>} />      
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App />
  
);

