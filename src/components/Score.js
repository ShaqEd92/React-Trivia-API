import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const Score = (props) => {

    const [difficulty, setDifficulty] = useState('');
    const [score, setScore] = useState(0);

    const scoreValues = {
        'easy': 5,
        'medium': 10,
        'hard': 15
    }

    useEffect(() => {
        if (props.triviaData && props.triviaIndex >= 0) {
            setDifficulty(props.triviaData[props.triviaIndex].difficulty)
        }
    }, [props.triviaData, props.triviaIndex]);

    useEffect(() => {
        console.log(`UpdateScore is currently ${props.updateScore}`)
        if (props.updateScore) {
            let val = difficulty;
            setScore(score + scoreValues[val])
        }
    }, [props.triviaIndex, props.updateScore]);

    {
        return (
            <div>
                <h1>Score</h1>
                <h2>{score}</h2>
            </div>
        )
    }
}

export default Score 