import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import '../styles/App.css';

//* Fetch data from trivia api
const Question = (props) => {

    const [oneQuestion, setOneQuestion] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);

    const getQuestion = () => {
        console.log(props.questions[questionNumber])
        setOneQuestion(props.questions[questionNumber])
        setQuestionNumber(questionNumber + 1)
    }

    return (
        <div className="Question">
            <QuestionCard questionObject={oneQuestion}/>
            <br/><br/><br/>
            <button onClick={ () => {
                props.onClick()
                getQuestion()
            }}>
                {props.started ? 'Next Question' : 'Begin'}
            </button>
        </div>
    );
}

export default Question;
