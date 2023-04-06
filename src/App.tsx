import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import PokemonDetails from './pages/pokemon-details';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/pokemon/:id' element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
