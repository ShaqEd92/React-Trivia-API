import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import Question from './Question';
import Answer from './Answer';
import Score from './Score';
import Timer from './Timer';
import logo from '../images/logo.png';
import '../styles/App.css';

export default class App extends Component {

  state = {
    error: null,
    started: false,
    triviaData: '',
    triviaIndex: -1,
    updateScore: false,
    secondsLeft: 15
  }

  commonProps = {
    started: this.state.started,
    triviaData: this.state.triviaData,
    triviaIndex: this.state.triviaIndex,
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

  componentDidUpdate() {
    this.commonProps = {
      started: this.state.started,
      triviaData: this.state.triviaData,
      triviaIndex: this.state.triviaIndex,
    }
  }

  handleClick = () => {
    if (!this.state.started) {
      this.begin()
    }
    this.setState({
      triviaIndex: this.state.triviaIndex + 1,
      secondsLeft: 15
    })
    this.countDown();
  }

  begin = () => {
    setInterval(() => {
      this.setState({
        started: true
      })
    }, 1500)
    this.componentDidUpdate();
  }

  answerQuestion = (check) => {
    this.setState({
      updateScore: check
    })
    this.handleClick();
  }

  countDown = () => {
    clearInterval(this.myInterval);
    this.myInterval = setInterval(() => {
      if (this.state.secondsLeft > 0 && this.state.started) {
        this.setState({
          secondsLeft: this.state.secondsLeft - 1
        })
      }
    }, 1000)
  }

  render() {
    return (
      <Grid className="App" celled='internally' style={{ textAlign: 'center', verticalAlign: 'center' }} >
        <Grid.Row>
          <Grid.Column width={4} >
            <Score {...this.commonProps} updateScore={this.state.updateScore} />
          </Grid.Column>
          <Grid.Column width={8}>
            Welcome to Trivia!
            <Question {...this.commonProps} onClick={this.handleClick} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Image src={logo} className="App-logo" alt="logo" />
            <Timer started={this.state.started} secondsLeft={this.state.secondsLeft} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Answer {...this.commonProps} answerQuestion={this.answerQuestion} />
          </Grid.Column>
        </Grid.Row>
      </Grid >
    );
  }
}

