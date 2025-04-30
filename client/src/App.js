import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import bootstrap from 'bootstrap';
import { AuthProvider } from './Contexts/AuthContext';
import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/Main/MainPage';
import RequireAuth from './Contexts/RequireAuth';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/main' element={
              <RequireAuth>
                <MainPage/>
              </RequireAuth>
              } />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
