import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import MatchSettings from './pages/MatchSettings';
import Leaderboard from './pages/Leaderboard';
import Games from './pages/Games';
import Login from './pages/Login';
import './styles/app.css';

function App() {
  return (
    <Routes>
      <Route path="matches/settings" element={ <MatchSettings /> } />
      <Route path="/leaderboard" element={ <Leaderboard /> } />
      <Route path="/matches" element={ <Games /> } />
      <Route path="/login" element={ <Login /> } />
      <Route exact path="/" element={ <Navigate to="/leaderboard" /> } />
    </Routes>
  );
}

export default App;
