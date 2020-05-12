import React, { useState, useEffect, Fragment } from 'react';
import shuffle from 'underscore';
import '../styles/App.css';

const Answer = (props) => {

    const [rightAnswer, setRightAnswer] = useState('');
    const [wrongAnswers, setWrongAnswers] = useState([]);

    useEffect(() => {
        if (props.triviaData && props.triviaIndex >= 0) {
            setRightAnswer(props.triviaData[props.triviaIndex].correct_answer)
            setWrongAnswers(props.triviaData[props.triviaIndex].incorrect_answers)
        }
    }, [props.triviaData, props.triviaIndex]);

    const escapeHTML = (str) => {
        if (str != null) {
            return str.replace(/&(#|q|a)(\w+);/g, function (match, dec) {
                return String.fromCharCode(dec);
            });
        }
    }

    const allAnswers = [...wrongAnswers, rightAnswer]

    const checkAnswer = (ans) => {
        let selected = ans;
        if (selected === rightAnswer) {
            console.log('Correct!')
            return true
        }
        else {
            console.log('Wrong!')
            return false
        }
    }

    const shuffledAnswers = shuffle(allAnswers).map((ans, key) => (
        <button key={key} onClick={() => {
            props.answerQuestion(checkAnswer(ans))
        }}>
            {escapeHTML(ans)}
        </button>))

    return (
        <Fragment>
            {props.started &&
                <div className='answers'>
                    {shuffledAnswers}
                    <p></p>
                </div>
            }
        </Fragment>
    )
};

export default Answer