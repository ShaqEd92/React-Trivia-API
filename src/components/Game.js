import React, { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import axios from 'axios';
import Question from './Question';
import Answer from './Answer';
import Score from './Score';
import Timer from './Timer';
import logo from '../images/logo.png';
import '../styles/App.css';

const Game = (props) => {

  const [started, setStarted] = useState(false);
  const [gameDone, setGameDone] = useState(false);
  const [triviaData, setTriviaData] = useState([]);
  const [triviaIndex, setTriviaIndex] = useState(-1);
  const [updateScore, setUpdateScore] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15);

  const commonProps = {
    started: started,
    triviaData: triviaData,
    triviaIndex: triviaIndex,
    gameDone: gameDone
  }

  const fetchData = async () => {
    const result = await axios("https://opentdb.com/api.php?amount=50&type=multiple");
    const data = result.data;
    setTriviaData(data.results);
  }

  useEffect(() => {
    if (triviaData.length === 0) fetchData();
    if (secondsLeft < 0) setStarted(false);
  })

  useEffect(() => {
    if (started && !gameDone) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const handleClick = () => {
    if (!started) begin();
    setTriviaIndex(triviaIndex + 1)
    setSecondsLeft(15);
  }

  const begin = () => setStarted(true);

  const answerQuestion = (check) => {
    setUpdateScore(check);
    if (triviaIndex <= 44) handleClick();
    if (triviaIndex === 44) {
      setGameDone(true);
      setStarted(false);
    }
  }

  return (
    <Grid className="App" celled='internally' style={{ textAlign: 'center', verticalAlign: 'center' }} >
      <Grid.Row>
        <Grid.Column width={4} >
          <Score {...commonProps} updateScore={updateScore} />
        </Grid.Column>
        <Grid.Column width={8}>
          {started ? `Question #${1 + triviaIndex}` : 'Welcome to Trivia!'}
          {secondsLeft < 0 ?
            <div>
              <br />
              <h1>Game Over</h1>
              <br /><br />
              <button onClick={props.newGame}>Play Again!</button>
            </div>
            : <Question {...commonProps} onClick={handleClick} />
          }
          {gameDone &&
            <div>
              <div>
                <br />
                <h1>Game Complete</h1>
                <br /><br />
                <button onClick={props.newGame}>Play Again!</button>
              </div>
            </div>
          }
        </Grid.Column>
        <Grid.Column width={4}>
          <Image src={logo} className="App-logo" alt="logo" />
          <Timer started={started} secondsLeft={secondsLeft} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Answer {...commonProps} answerQuestion={answerQuestion} />
        </Grid.Column>
      </Grid.Row>
    </Grid >
  );
}

export default Game;