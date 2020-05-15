import React, { useState } from 'react';
import Game from './Game';
import '../styles/App.css';

const App = () => {

  const [gameId, setGameId] = useState(1);

  return(
    <Game key={gameId} newGame={() => setGameId(gameId + 1)} />
  );
}

export default App;