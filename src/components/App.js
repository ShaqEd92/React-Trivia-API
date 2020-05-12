import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import Answer from './Answer';
import Question from './Question';
import Score from './Score';
import logo from '../images/logo.png';
import '../styles/App.css';

export default class App extends Component {

  state = {
    error: null,
    started: false,
    triviaData: '',
    triviaIndex: -1,
    updateScore: false
  }

  componentDidMount = () => {
    fetch("https://opentdb.com/api.php?amount=50&type=multiple")
      .then(res => res.json())
      .then(
        (result) => {
          const data = result.results
          this.setState({
            triviaData: data
          });
        },
        (error) => {
          this.setState({
            error: error
          });
        }
      )
  }

  handleClick = () => {
    if (!this.state.started) {
      this.begin()
    }
    this.setState({
      triviaIndex: this.state.triviaIndex + 1
    })
  }

  begin = () => {
    this.setState({
      started: true
    })
  }

  answerQuestion = (check) => {
    this.setState({
      updateScore: check
    })
    this.handleClick();
  }

  render() {
    return (
      <Grid className="App" celled='internally' style={{ textAlign: 'center', verticalAlign: 'center' }} >
        <Grid.Row>
          <Grid.Column width={4} >
            <Score updateScore={this.state.updateScore} triviaData={this.state.triviaData} triviaIndex={this.state.triviaIndex}/>
          </Grid.Column>
          <Grid.Column width={8}>
            Welcome to Trivia!
            <Question onClick={this.handleClick} started={this.state.started} triviaData={this.state.triviaData}
              triviaIndex={this.state.triviaIndex} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Image src={logo} className="App-logo" alt="logo" />
            Timer goes here!
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Answer started={this.state.started} triviaData={this.state.triviaData} triviaIndex={this.state.triviaIndex} answerQuestion={this.answerQuestion} />
          </Grid.Column>
        </Grid.Row>
      </Grid >
    );
  }
}

