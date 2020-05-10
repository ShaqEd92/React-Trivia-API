import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import Answer from './Answer';
import Question from './Question';
import Score from './Score';
import logo from '../images/logo.png';
import '../styles/App.css';

export default class App extends Component {

  state = { isLoaded: false, error: null, started: false, questions: [] }

  componentDidMount = () => {
    fetch("https://opentdb.com/api.php?amount=50&type=multiple")
      .then(res => res.json())
      .then(
        (result) => {
          const data = result.results
          this.setState({
            isLoaded: true,
            questions: data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  begin = () => {
    this.setState({
      started: true
    })
  }

  render() {
    return (
      <Grid className="App" celled='internally' style={{ textAlign: 'center', verticalAlign: 'center' }} >
        <Grid.Row>
          <Grid.Column width={4} >
            <Score />
            <br />
            Record score here!
          </Grid.Column>
          <Grid.Column width={8}>
            Display Question here!
            <Question onClick={this.begin} started={this.state.started} questions={this.state.questions} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Image src={logo} className="App-logo" alt="logo" />
            Timer goes here!
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Answer />
            <br />
            Display Answer choices for selection here!
          </Grid.Column>
        </Grid.Row>
      </Grid >
    );
  }
}

