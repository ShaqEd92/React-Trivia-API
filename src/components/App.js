import React, { useState, useEffect } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import axios from 'axios';
import Question from './Question';
import Answer from './Answer';
import Score from './Score';
import Timer from './Timer';
import logo from '../images/logo.png';
import '../styles/App.css';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [triviaData, setTriviaData] = useState([]);
  const [triviaIndex, setTriviaIndex] = useState(-1);
  const [updateScore, setUpdateScore] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15);

  const commonProps = {
    started: started,
    triviaData: triviaData,
    triviaIndex: triviaIndex
  }

  const fetchData = async () => {
    const result = await axios("https://opentdb.com/api.php?amount=50&type=multiple");
    const data = result.data;
    setTriviaData(data.results);
  }

  useEffect(() => {
    if(triviaData.length == 0){
      fetchData();
      console.log('Got data!')
    }
    setIsLoading(false);
  }, [])

  useEffect(() => {
  	if (secondsLeft > 0 && started) {
      const timer = setTimeout(() => {
	      setSecondsLeft(secondsLeft - 1);
      }, 1000);
    	return () => clearTimeout(timer);
  	}
  });

  const handleClick = () => {
    if (!started) {
      begin()
    }
    setTriviaIndex(triviaIndex + 1);
    setSecondsLeft(15);
  }

  const begin = () => {
    setInterval(() => {
      setStarted(true)
    }, 1500)
  }

  const answerQuestion = (check) => {
    setUpdateScore(check)
    handleClick();
  }

  return isLoading ? null : (
    <Grid className="App" celled='internally' style={{ textAlign: 'center', verticalAlign: 'center' }} >
      <Grid.Row>
        <Grid.Column width={4} >
          <Score {...commonProps} updateScore={updateScore} />
        </Grid.Column>
        <Grid.Column width={8}>
          Welcome to Trivia!
            <Question {...commonProps} onClick={handleClick} />
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


export default App;