import React, { useState, useEffect, Fragment } from 'react';
import shuffle from 'underscore';
import '../styles/App.css';

const Answer = (props) => {

    const [rightAnswer, setRightAnswer] = useState('');
    const [allAnswers, setAllAnswers] = useState([]);

    useEffect(() => {
        if (props.triviaData && props.triviaIndex >= 0) {
            setRightAnswer(props.triviaData[props.triviaIndex].correct_answer)
            let answers = [...props.triviaData[props.triviaIndex].incorrect_answers, props.triviaData[props.triviaIndex].correct_answer];
            setAllAnswers(shuffle.shuffle(answers))
        }
    }, [props.triviaIndex, props.triviaData]);

    const escapeHTML = (str) => {
        if (str != null) {
            return str.replace(/&(#|q|a)(\w+);/g, function (match, dec) {
                return String.fromCharCode(dec);
            });
        }
    }

    const checkAnswer = (answer) => { return (answer === rightAnswer) }

    const shuffledAnswers = allAnswers.map((ans, key) => (
        <button key={key} onClick={() => {
            props.answerQuestion(checkAnswer(ans))
        }}>
            {escapeHTML(ans)}
        </button>))

    return (
        <Fragment>
            {props.started &&
                <div className='answers'>
                    { (!props.gameDone) &&
                        shuffledAnswers
                    }
                </div>
            }
        </Fragment>
    )
};

export default Answer