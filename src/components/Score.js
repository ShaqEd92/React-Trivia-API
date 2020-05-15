import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const Score = (props) => {

    const [difficulty, setDifficulty] = useState('');
    const [score, setScore] = useState(0);
    const [userFeedback, setUserFeedback] = useState('');

    const scoreValues = {
        'easy': 5,
        'medium': 10,
        'hard': 15
    }

    const flashResult = () => {
        if (props.triviaIndex > 0) {
            props.updateScore ? setUserFeedback('Correct!') : setUserFeedback('Wrong!');
            setTimeout(() => {
                clearTimeout()
                setUserFeedback('')
            }, 2500)
        }
    }

    useEffect(() => {
        if (props.triviaData && props.triviaIndex >= 0) {
            setDifficulty(props.triviaData[props.triviaIndex].difficulty)
        }
    }, [props.triviaIndex, props.triviaData]);

    useEffect(() => {
        if (props.updateScore) {
            let val = difficulty;
            setScore(s => s + scoreValues[val])
        }
        flashResult();
    }, [props.triviaIndex, props.updateScore]);

    return (
        <div>
            <h1>Score</h1>
            <h2>{score}</h2>
            <br />
            <h3>{userFeedback}</h3>
            { (userFeedback && userFeedback == 'Wrong!') ?
                <div>
                    <br/>
                    <h4 style={{textDecoration: 'underline'}}>Correct Answer</h4>
                    <h4>{props.triviaData[props.triviaIndex-1].correct_answer}</h4>
                </div>
                :
                null
            }
        </div>
    )
}

export default Score 