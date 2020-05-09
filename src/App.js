import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Answer from './components/Answer';
import Question from './components/Question';
import Score from './components/Score';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Container textAlign='right'>
          <img src={logo} className="App-logo" alt="logo" />
        </Container>
        <Container textAlign='left'>
          <Score />
        </Container>
        <Container textAlign='center'>
          <Question />
          <Answer />
        </Container>
      </div>
    );
  }
}

export default App;
