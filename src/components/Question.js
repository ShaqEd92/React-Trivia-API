import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import '../styles/App.css';

const Question = (props) => {

    const [oneQuestion, setOneQuestion] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);

    const getQuestion = () => {
        setOneQuestion(props.questions[questionNumber])
        setQuestionNumber(questionNumber + 1)
    }

    return (
        <div className="Question">
            {props.started &&
                <QuestionCard questionObject={oneQuestion} />
            }
            <br /><br /><br />
            <button onClick={() => {
                props.onClick()
                getQuestion()
            }}>
                {props.started ? 'Next Question' : 'Click to Begin'}
            </button>
        </div>
    );
}

export default Question;
