import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import bootstrap from 'bootstrap';
import LoginPage from './pages/Login/LoginPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
