import React, { useState, useEffect, Fragment } from 'react';
import '../styles/App.css';

const Answer = (props) => {

    useEffect(() => {
        if (props.triviaData && props.triviaIndex) {
            setRightAnswer(props.triviaData[props.triviaIndex].correct_answer)
            setWrongAnswers(props.triviaData[props.triviaIndex].incorrect_answers)
        }
    }, [props.triviaData, props.triviaIndex]);

    const [rightAnswer, setRightAnswer] = useState('');
    const [wrongAnswers, setWrongAnswers] = useState([]);

    return (
        <Fragment>
            {props.started &&
                <div>
                    {console.log(rightAnswer, wrongAnswers)}
                    <p>{rightAnswer}</p>
                    <p>{wrongAnswers[0]}</p>
                    <p>{wrongAnswers[1]}</p>
                    <p>{wrongAnswers[2]}</p>
                </div>
            }
        </Fragment>
    )
};

export default Answer