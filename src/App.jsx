import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import Scoreboard from './components/Scoreboard'

function App() {
  const [currScore, setCurrScore] = useState(0);

  const [highScore, setHighScore] = useState(0);

  const updateCurrScore = (procedure) => {
    if(procedure) setCurrScore(currScore + 1);
    else setCurrScore(0);
  }

  const updateHighScore = () => {
    if(currScore == highScore)
      setHighScore(highScore + 1);
  }

  return (
    <div className='app'>
      <div className='top'>
        <div className='left'>
          <img src="src/assets/pokeball.webp" className='sprite'/>
          <h1>Pokemon Memory Game</h1>
          <img src="src/assets/pokeball.webp" className='sprite'/>
        </div>
        <div className='right'>
          <Scoreboard currScore={currScore} highScore={highScore}/>
        </div>
      </div>
      <div>
        <Board updateCurrScore={updateCurrScore} updateHighScore={updateHighScore}/>
      </div>

    </div>
  )
}

export default App
