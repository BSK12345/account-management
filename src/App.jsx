// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/pages/Navbar';
import Register from './components/pages/RegisterPage';
import Login from './components/pages/LoginPage';
import AccountInfo from './components/pages/AccountPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/account" element={<AccountInfo loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/" element={<h1>Welcome to the Account Management App</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
