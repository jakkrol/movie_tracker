import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/Main/MainPage';
import RequireAuth from './Contexts/RequireAuth';
import RegisterPage from './pages/Login/RegisterPage';
import MoviePreviewPage from './pages/Main/MoviePreviewPage';
import WatchlistPage from './pages/Watchlist/WatchlistPage';
import MoviePreviewWatchlistPage from './pages/Watchlist/MoviePreviewWatchlistPage';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/main' element={
              <RequireAuth>
                <MainPage/>
              </RequireAuth>
              } />
               <Route path='/main/details' element={
              <RequireAuth>
                <MoviePreviewPage/>
              </RequireAuth>
              } />
            <Route path='/watchlist' element={
              <RequireAuth>
                <WatchlistPage/>
              </RequireAuth>
              } />
            <Route path='/watchlist/details' element={
              <RequireAuth>
                <MoviePreviewWatchlistPage/>
              </RequireAuth>
              } />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
